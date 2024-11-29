import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
from pytube import Search
import yt_dlp

# Replace these with your app's client ID and secret
CLIENT_ID = 'a616474b5d1a4e1da40834015547c21c'
CLIENT_SECRET = '794c07a297624b9dbaaabea15a765683'
REDIRECT_URI = 'http://localhost:8888/callback/'

# Define the scope
scope = 'playlist-read-private'

# Authenticate with Spotify
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                               client_secret=CLIENT_SECRET,
                                               redirect_uri=REDIRECT_URI,
                                               scope=scope))

# Function to scrape playlist details
def get_playlist_tracks(playlist_id):
    results = sp.playlist_tracks(playlist_id)
    tracks = results['items']

    track_data = []
    while results['next']:
        results = sp.next(results)
        tracks.extend(results['items'])

    for track in tracks:
        track_info = track['track']
        track_data.append({
            'name': track_info['name'],
            'artist': ', '.join([artist['name'] for artist in track_info['artists']])
        })

    return track_data

# Function to get the playlist name
def get_playlist_name(playlist_id):
    playlist = sp.playlist(playlist_id)
    return playlist['name']

# Function to download song from YouTube
def download_song(title, save_path):
    search_query = f"{title} audio"
    print(f"Searching for: {search_query}")
    try:
        search = Search(search_query)
        video_url = search.results[0].watch_url
        print(f"Downloading: {video_url}")

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': save_path,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
        print(f'Downloaded: {title}')
    except Exception as e:
        print(f"Failed to download {title}: {e}")

# Get playlist link and save directory from the user
playlist_link = input('Enter the playlist link: ')
base_save_directory = input('Enter the base directory where you want to save the files: ')

# Extract playlist ID from the link
playlist_id = playlist_link.split('/')[-1].split('?')[0]

# Get the playlist name
playlist_name = get_playlist_name(playlist_id)

# Create a new directory with the playlist name
save_directory = os.path.join(base_save_directory, playlist_name)
if not os.path.exists(save_directory):
    os.makedirs(save_directory)

# Scrape the playlist tracks
tracks = get_playlist_tracks(playlist_id)

# Download each song
for track in tracks:
    song_title = f"{track['name']} {track['artist']}"
    mp3_filename = f"{track['name']} - {track['artist']}.mp3"
    mp3_save_path = os.path.join(save_directory, mp3_filename)
    download_song(song_title, mp3_save_path)
