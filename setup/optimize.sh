#!/usr/local/bin/zsh

# @see https://www.lifewire.com/terminal-tricks-to-speed-up-your-mac-4120954

# Disable windows animations
defaults write NSGlobalDomain NSAutomaticWindowAnimationsEnabled -bool false
#defaults write NSGlobalDomain NSAutomaticWindowAnimationsEnabled -bool true

# Disable resize animations
defaults write NSGlobalDomain NSWindowResizeTime -float 0.001
#defaults write NSGlobalDomain NSWindowResizeTime -float 0.2

# Disable info window animations
defaults write com.apple.finder DisableAllAnimations -bool true
#defaults write NSGlobalDomain NSWindowResizeTime -float 0.2

# Disable quick look animations
defaults write -g QLPanelAnimationDuration -float 0
#defaults delete -g QLPanelAnimationDuration

# Faster mission control animations
defaults write com.apple.dock expose-animation-duration -float 0.1
#defaults delete com.apple.dock expose-animation-duration

# Dock Zero Delay
defaults write com.apple.dock autohide-time-modifier -float 0
#defaults delete com.apple.dock autohide-time-modifier

# No launch animation
defaults write com.apple.dock launchanim -bool false
#defaults write com.apple.dock launchanim -bool true

# Timemachine throttle
sudo sysctl debug.lowpri_throttle_enabled=0
#sudo sysctl debug.lowpri_throttle_enabled=1

# Mail : no animations
defaults write com.apple.mail DisableReplyAnimations -bool true
#defaults delete com.apple.dock DisableReplyAnimations
defaults write com.apple.mail DisableSendAnimations -bool true
#defaults delete com.apple.dock DisableSendAnimations

Killall Dock
