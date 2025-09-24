# Setup

## 概要

- 環境構築関連のドキュメンントを管理

## 前提

- こちらのコマンドがエラーなく実行できること

```sh
git --version
npm --version
cursor --version
ssh -T git@github.com
```

## 環境構築手順

- 下記のコマンドを実行

```sh
cd ~
git clone git@github.com:zucky2021/rand-str-gen.git
cd rand-str-gen
cp .env.example .env
npm ci
npm run dev
```
