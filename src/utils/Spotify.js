const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

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

    // Search Request to Spoftify API
    search(term) {
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Spotify Request Failed!');
        })
        .then(data => {
            if (!data.tracks || !data.tracks.items) {
                return [];
            }
            return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
        .catch(error => {
            console.log(error);
            return [];
        });
    }
};