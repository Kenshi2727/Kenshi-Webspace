#!/usr/bin/env bash

case "$1" in
    dev)
        bash scripts/dev.sh
        ;;
    build)
        bash scripts/build.sh
        ;;
    install)
        bash scripts/install.sh
        ;;
    lint)
        bash scripts/lint.sh
        ;;
    format)
        bash scripts/format.sh
        ;;
    migrate)
        bash scripts/db-migrate.sh
        ;;
    reset-db)
        bash scripts/db-reset.sh
        ;;
    seed)
        bash scripts/db-seed.sh
        ;;
    backup)
        bash scripts/backup-db.sh
        ;;
    clean)
        bash scripts/clean.sh
        ;;
    sync)
        bash scripts/git-sync.sh
        ;;
    check)
        bash scripts/check-env.sh
        ;;
    deploy)
        bash scripts/deploy.sh
        ;;
    *)
        echo "Usage:"
        echo "  ./scripts/master.sh dev"
        echo "  ./scripts/master.sh build"
        echo "  ./scripts/master.sh install"
        echo "  ./scripts/master.sh migrate"
        echo "  ./scripts/master.sh reset-db"
        echo "  ./scripts/master.sh backup"
        echo "  ./scripts/master.sh sync"
        echo "  ./scripts/master.sh deploy"
        ;;
esac