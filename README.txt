Grid Layout Planner
v0.17
----------------------------------------------

A tool for planning grid layouts based on draggable furniture & blocked terrain.
The general intent is to be used as a utility for games with a grid-based design element such as Rimworld or Stardew Valley.

Tested in Google Chrome on Windows.



KNOWN BUGS
----------
	~The first time furniture is dragged from the shopping window, it displays under the grid until dropped onto the grid.
	~Furniture wider than it is tall which is rotated 90 degrees & placed near the left edge of the grid will overflow horizontally.
		I know one fix already, but am investigating other ways to avoid side effects.

PLANNED FEATURES
----------------
	~TBA


CHANGELOG
---------
v0.10
There is now a grid layout planner.

v0.11
Reset grid button now has a confirmation box and removes furniture + terrain instead of just terrain.

v0.12
WASD keys will adjust the size of the furniture in the window shopping area.
SW will decrease/increase height, AD will decrease/increase width.

v0.13
Number input will properly enforce minimum (1) & maximum width & height in squares for furniture.
Maximum is set from a variable in the app.js script for easier changes in the future.

v0.14
App wrapper now expands its height & width to fit large grids. (Which will be visible when custom grid sizes are possible.)

v0.15
Able to resize grid to a custom size. This currently destroys all furniture & terrain on the grid,
including furniture/terrain within the bounds of the new grid size.

v0.16
Created tabs for the control panel. THe active tab controls which edit mode is active & what controls are available.
Current tabs are Grid, Terrain, and Furniture.
Number keys serve as hotkeys for activating tabs.

v0.17
Added click-and-drag behavior to paint & erase tools for terrain editing.
New tools include both freehand and straight-line.