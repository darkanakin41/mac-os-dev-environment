module.exports = {
    DOCKER_APACHE_USER: 'www-data',
    DOCKER_APACHE_GROUP: 'root',
    DOCKER_PHP_USER: 'www-data',
    DOCKER_PHP_GROUP: 'root',

    DOCKER_PHP_CONTAINER:'<you php container>',
    DOCKER_APACHE_CONTAINER:'<you apache container>',

    SYMFONY_CHECKS: {
        'doctrine/orm': {
            variants: ['symfony/orm-pack'],
            actions: ['php bin/console doctrine:schema:validate --skip-sync --no-interaction']
        },
        'symfony/yaml': {
            actions: ['php bin/console lint:yaml config --parse-tags']
        },
        'twig/twig': {
            variants: ['symfony/twig-bundle'],
            actions: ['php bin/console lint:twig templates']
        },
        'phpstan/phpstan': {
            actions: ['php vendor/bin/phpstan analyse src --level=5']
        },
        'friendsofphp/php-cs-fixer': {
            actions: ['php vendor/bin/php-cs-fixer fix src --dry-run']
        },
    }
}
