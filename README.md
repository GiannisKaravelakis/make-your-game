# Duck Hunt

A browser-based Duck Hunt clone built with vanilla JavaScript, HTML, and CSS — no frameworks, no canvas, just DOM manipulation and CSS transforms. Aim your crosshair, shoot down ducks before they escape, and survive as long as you can before your lives or the clock run out.

## How to Run

**Option 1: Open directly**
Just double-click `index.html` to open it in your browser. No build step or installation required — the project is fully static HTML/CSS/JS.

**Option 2: Run via a local server**
Some browsers restrict certain features when opening files directly (`file://`), so if you run into issues, serve the project locally instead:

```bash
# Using Python
python -m http.server

# Or using the VS Code "Live Server" extension
# Right-click index.html -> "Open with Live Server"
```

Then open `http://localhost:8000` (or whatever port is shown) in your browser.

## Controls

| Key | Action |
|---|---|
| Arrow Keys | Move the crosshair |
| Space | Shoot |
| Escape | Pause / Resume |

## Features

- Main menu, pause menu, and how-to-play screen
- Wave-based duck spawning with a shared wave timer
- Ducks fly, bounce off screen edges, and animate via a sprite sheet
- Lives system — ducks that escape a wave cost a life
- 60-second round timer
- Built with performance in mind: transform/opacity-based rendering, object pooling, and a fixed timestep-safe game loop targeting a steady 60fps

## Project Structure
 
```
duck-hunt/
├── index.html
├── README.md
├── LICENSE
├── assets/
│   ├── background/
│   │   ├── sprite_bg.png
│   │   └── sprite_bg_ground.png
│   ├── crosshair/
│   │   └── sprite_aim.png
│   └── duck/
│       └── sprite_newduck_right.png
├── css/
│   └── style.css
├── js/
│   ├── input.js       # Tracks raw keyboard state
│   ├── crosshair.js   # Crosshair movement and rendering
│   ├── duck.js         # Duck spawning, movement, animation, rendering
│   ├── collision.js   # Crosshair/duck hit detection
│   ├── state.js       # Screen/state management (menu, playing, paused, etc.)
│   └── game.js         # Main game loop, scoring, lives, timers, UI wiring
└── plans/
```

## Credits

Duck, crosshair, and background sprites by [ragna-yamazashi](https://ragna-yamazashi.itch.io/duck-hunt-sprites-by-rag).

## License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.