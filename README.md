# photoshop_scripts
My scripts for Adobe Photoshop

# Layer Comper
### layercomper.jsx
Create Layer Comps in order: parent layer/group visibility -> layer comp

<img src="http://s30.postimg.org/9memkr1wx/layercomper.gif">

Useful for Smart Object layer comps

# Pixel to symbol
### pixel_to_symobl.jsx
Transform each pixel into a symbol.

<img src="http://s27.postimg.org/v3uo9hm9f/instruction.png">

Tips:
* don`t use large images. 8K is max, but I recommend use <1K pixels
* you can use your own text. Just replace userText
* use this regex "\ |\"|\[|\]|\'|\-|\_|\.|\," to clean text from non-letters
* don`t forget to enlarge your image and change font size after complete

# Pretty My Font
### prettyfont.jsx

Transform odd integer and fractional font size and leading values into the even numbers. Actual only for selected layers. 

Tip: How to select all text layers.

<img src="http://s27.postimg.org/8hzym65zn/select_all_layers.gif">
