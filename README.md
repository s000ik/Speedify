# [Speedify](https://github.com/s000ik/speedify) 

<br>

<div align="center">
<div height="400" width="400">
 <img src="./images/Icon.png" alt="Speedify" width="250" height="250">
</div>
</div>
 
<br>
This extension for Spotify boosts performance by optimizing animations, implementing virtual scrolling, and improving memory usage.
<br>
<br>
⭐ If this extension helped you, please put a star to get it noticed by more people.

## Dependencies
To install the extension you need to install [`Spicetify`](https://spicetify.app/docs/advanced-usage/installation) following the instructions in the documentation. After that you can find the `Speedify` extension in the `Spicetify` extension shop.

## Features
- Hardware-accelerated animations and transitions
- Virtual scrolling for large playlists and lists
- Optimized memory management and garbage collection
- Reduced CPU usage and smoother scrolling
- Background tab performance improvements
- Smart resource loading and caching

## Marketplace Installation
1. Search for `Speedify` in `Spicetify Marketplace`
2. Click the download button and select reload now

## Manual Installation
1. Download the [`speedify.js`](https://github.com/s000ik/speedify/blob/main/dist/speedify.js) file and place it in:

| Platform    | Path                             |
|-------------|:--------------------------------:|
| Windows     | `%appdata%\spicetify\Extensions` |
| Linux/MacOS | `~/.config/spicetify/Extensions` |

2. Activate the extension using:
```console
$ spicetify config extensions speedify.js
$ spicetify apply
```

## Uninstallation
1. Disable the extension using:
```console
$ spicetify config extensions speedify.js-
$ spicetify apply
```

2. Delete the file from step #1 in the installation instructions. (Optional)

## Support & Troubleshooting

For assistance, please:
- Check existing issues
- Open a new issue if unresolved
