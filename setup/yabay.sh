#!/usr/local/bin/zsh

brew install koekeishiya/formulae/yabai
sudo yabai --install-sa
sudo yabai --load-sa
brew services start yabai


# Installation ubersicht
brew install --cask ubersicht
open -a "Ubersicht"
git clone https://github.com/Jean-Tinland/simple-bar $HOME/Library/Application\ Support/Übersicht/widgets/simple-bar
