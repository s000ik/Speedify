<div align="center">
<div height="256" width="256">
 <img src="./images/Icon.png" alt="Speedify" width="256" height="256">
</div>
 <h1 align="center">
   <a href="https://github.com/s000ik/speedify" style="text-decoration: none;">Speedify</a>
 </h1>
</div>

This extension for Spotify boosts performance by optimizing animations, implementing virtual scrolling, and improving memory usage.

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

## Support
For issues or suggestions, please open an issue on [GitHub](https://github.com/s000ik/speedify/issues).
