import queryString from 'query-string';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = 'https://jamming-playlist-creator.netlify.app/';
let accessToken = '';
let clientAccessToken = '';

export const Spotify = {

    getAccessToken() {
        // Check if the user’s access token is already set
        if (accessToken) {
            return accessToken;
        }

        // Check if the access token is in the URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Clear the access token and URL parameters after expiration
            window.setTimeout(() => {
                accessToken = '';
            }, expiresIn * 1000);

            window.history.pushState('Access Token', null, '/'); // Clear the URL
            return accessToken;

            // Redirect the user to the Spotify authorization endpoint
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

            window.location = accessUrl;
        }
    },

    async getClientAccessToken() {
        if (clientAccessToken) {
            return clientAccessToken;
        }

        let data = {
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString.stringify(data),
        };

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', requestOptions);
            const responseData = await response.json();
    
            clientAccessToken = responseData.access_token;
    
            return clientAccessToken;
        } catch (error) {
            console.error('Error fetching access token:', error);
            // Handle error as needed
        }
    },

    // Search Request to Spoftify API
    search(term) {
        Spotify.getClientAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${clientAccessToken}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Spotify Access Token Request Failed!');
            })
            .then(data => {
                if (!data.tracks || !data.tracks.items) {
                    return [];
                }
                return data.tracks.items.map(track => ({
                    id: track.id,
                    trackUrl: track.external_urls.spotify,
                    image: track.album.images[1].url,
                    name: track.name,
                    artist: track.artists[0].name,
                    artistUrl: track.artists[0].external_urls.spotify,
                    album: track.album.name,
                    albumUrl: track.album.external_urls.spotify,
                    uri: track.uri,
                    previewUrl: track.preview_url
                }));
            })
            .catch(error => {
                console.log(error);
                return [];
            });
    },

    // Save playlist to user's Spotify account
    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Saving Playlist Failed!');
            })
            .then(jsonResponse => {
                userId = jsonResponse.id;

                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: playlistName })
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Saving Playlist Name Failed!');
                    })
                    .then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        })
                    })
            });
    },

    // Fetch preview_url of track using id
    getTrackPreview(id) {
        Spotify.getClientAccessToken();
        const headers = { Authorization: `Bearer ${clientAccessToken}` };

        return fetch(`https://api.spotify.com/v1/tracks/${id}`, { headers: headers })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Track Preview Request Failed!');
            })
            .then(data => {
                return data.preview_url;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }
};