#!/usr/local/bin/zsh

echo Updating yabai configuration ...
rm $HOME/.yabairc
cp yabairc $HOME/.yabairc
brew services restart yabai

echo DONE !
