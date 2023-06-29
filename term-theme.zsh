#!/usr/bin/env zsh

export ZSH_TT_DIR=${0:a:h}

local prevPath=$(pwd)
local packageManager
if command -v yarn &> /dev/null; then
  packageManager="yarn"
elif command -v pnpm &> /dev/null; then
  packageManager="pnpm"
elif command -v npm &> /dev/null; then
  packageManager="npm"
else
  echo "\033[31m There are no tools to install with\033[0m"
  return 1
fi

cd $ZSH_TT_DIR

if [[ ! -d node_modules ]]; then
  $packageManager install
fi

if ! echo $PATH | grep $ZSH_TT_DIR &> /dev/null; then
  export PATH="$ZSH_TT_DIR/bin:$PATH"
fi

cd $prevPath

true
