# React Playlist Creator for Spotify

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>  <img src="https://img.shields.io/badge/Codecademy-FFF0E5?style=for-the-badge&logo=codecademy&logoColor=303347"/> <img src="https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white" />

![Jamming Banner](https://i.postimg.cc/mkYDP2dy/jamming-cover.png)

<br>

## Project Overview

A React application to search tracks, discover artists and album details, and listen to its audio preview using Spotify's Web API. This project aims to provide easy access to create a playlist and save it to the user's Spotify account.

<br>

## Features

- **Spotify Library:** Requests to Spotify API to display content from the Spotify library. Search for tracks to include in the user's custom playlist.

- **Playlist Creation:** Create playlists by selecting tracks from the Spotify library.
  
- **Preview Samples:** Provide preview samples for each track.

- **Loading Screen for Playlist Saving:** Shows a loading screen to provide feedback while the custom playlist is being saved to their Spotify account.

- **Notification Message:** Show a message box in the upper right corner for handling errors and successful playlist saving.

- **Persistent Search Term:** Maintains the user's search term even after a redirect on login. Restores the previous search term to continue the user's search query without re-entering information.

- **Token Refresh Handling:** Prevents loss of playlist information in case of a token refresh by ensuring that the playlist data persists.

<br>

## Feature Request Document

For a detailed list of feature requests and their justifications, please refer to the [Feature Request Extension](./jamming-feature-extension.pdf) included.

<br>

## Tech Stack

- **HTML:** Structure the content of the web pages.
- **CSS:** Style the application for a user-friendly interface.
- **JavaScript:** Implement dynamic and interactive experience.
- **React:** React library for efficient component-based development.
- **Spotify API:** Integrate Spotify's API to access track information.

<br>

## Future Work

### Upload Playlist Cover Photo
Playlist personalization experience by allowing users to upload a custom cover photo for their playlists. This feature would enable users to visually identify and differentiate their playlists, adding a touch of personal flair to their music collections.

### Edit Playlist Description
Users can edit the description of their playlists. This feature would allow users to add context, notes, or any information they wish to associate with their playlists. Enabling playlist description edits contributes to a more comprehensive and customizable user experience.

<br>

@Jan 2024
