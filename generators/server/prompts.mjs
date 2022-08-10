
import chalk from 'chalk';
import { OPTIONS_NAME } from './application-options-constants.mjs';

const {
  BUILD_TOOL,
  CACHE_PROVIDER,
  DATABASE_TYPE,
  PACKAGE_NAME,
  DEV_DATABASE_TYPE,
  PROD_DATABASE_TYPE,
  REACTIVE,
  SERVER_PORT,
  SERVICE_DISCOVERY_TYPE,
} = OPTIONS_NAME;

// constants
const OAUTH2= 'oauth2';
const MONOLITH= 'monolith';
const GATEWAY= 'gateway';

const MAVEN= 'maven';
const GRADLE= 'gradle';

const CASSANDRA ='cassandra';
const COUCHBASE ='couchbase';
const MARIADB='mariadb';
const MSSQL='mssql';
const MYSQL='mysql';
const ORACLE='oracle';
const POSTGRESQL='postgresql';
const SQL='sql';
const MONGODB='mongodb';
const NEO4J='neo4j';
const H2_DISK='h2Disk';
const H2_MEMORY='h2Memory';
const NO='no';

const CONSUL= 'consul';
const EUREKA= 'eureka';

const CAFFEINE= 'caffeine';
const EHCACHE= 'ehcache';
const HAZELCAST= 'hazelcast';
const INFINISPAN= 'infinispan';
const MEMCACHED= 'memcached';
const REDIS= 'redis';

const NO_SERVICE_DISCOVERY = NO;
const NO_DATABASE = NO;
const NO_CACHE_PROVIDER = NO;

const R2DBC_DB_OPTIONS = [
  {
    value: POSTGRESQL,
    name: 'PostgreSQL',
  },
  {
    value: MYSQL,
    name: 'MySQL',
  },
  {
    value: MARIADB,
    name: 'MariaDB',
  },
  {
    value: MSSQL,
    name: 'Microsoft SQL Server',
  },
];

const SQL_DB_OPTIONS = [
  {
    value: POSTGRESQL,
    name: 'PostgreSQL',
  },
  {
    value: MYSQL,
    name: 'MySQL',
  },
  {
    value: MARIADB,
    name: 'MariaDB',
  },
  {
    value: ORACLE,
    name: 'Oracle',
  },
  {
    value: MSSQL,
    name: 'Microsoft SQL Server',
  },
];

export function askForServerSideOpts() {
  if (this.existingProject) return undefined;

  const applicationType = this.jhipsterConfig.applicationType;
  const defaultPort = applicationType === GATEWAY ? '8080' : '8081';
  const prompts = [
    {
      when: () => [MONOLITH].includes(applicationType),
      type: 'confirm',
      name: REACTIVE,
      message: 'Do you want to make it reactive with Spring WebFlux?',
      default: false,
    },
    {
      when: () => applicationType === GATEWAY,
      type: 'input',
      name: SERVER_PORT,
      validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
      message:
        'As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.',
      default: defaultPort,
    },
    {
      type: 'input',
      name: PACKAGE_NAME,
      validate: input =>
        /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
          ? true
          : 'The package name you have provided is not a valid Java package name.',
      message: 'What is your default Java package name?',
      default: 'com.mycompany.myapp',
      store: true,
    },
    {
      when: () => applicationType === 'gateway',
      type: 'list',
      name: SERVICE_DISCOVERY_TYPE,
      message: 'Which service discovery server do you want to use?',
      choices: [
        {
          value: EUREKA,
          name: 'JHipster Registry (uses Eureka, provides Spring Cloud Config support and monitoring dashboards)',
        },
        {
          value: CONSUL,
          name: 'Consul',
        },
        {
          value: NO_SERVICE_DISCOVERY,
          name: 'No service discovery',
        },
      ],
      default: EUREKA,
    },
    {
      type: 'list',
      name: DATABASE_TYPE,
      message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
      choices: answers => {
        const opts = [];
        if (!answers.reactive) {
          opts.push({
            value: SQL,
            name: 'SQL (H2, PostgreSQL, MySQL, MariaDB, Oracle, MSSQL)',
          });
        } else {
          opts.push({
            value: SQL,
            name: 'SQL (H2, PostgreSQL, MySQL, MariaDB, MSSQL)',
          });
        }
        opts.push({
          value: MONGODB,
          name: 'MongoDB',
        });
        opts.push({
          value: COUCHBASE,
          name: '[BETA] Couchbase',
        });
        opts.push({
          value: NEO4J,
          name: '[BETA] Neo4j',
        });
        opts.push({
          value: NO_DATABASE,
          name: 'No database',
        });
        return opts;
      },
      default: SQL,
    },
    {
      when: response => response.databaseType === SQL,
      type: 'list',
      name: PROD_DATABASE_TYPE,
      message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
      choices: answers => (answers.reactive ? R2DBC_DB_OPTIONS : SQL_DB_OPTIONS),
      default: POSTGRESQL,
    },
    {
      when: response => response.databaseType === SQL,
      type: 'list',
      name: DEV_DATABASE_TYPE,
      message: `Which ${chalk.yellow('*development*')} database would you like to use?`,
      choices: response =>
        [
          {
            value: H2_DISK,
            name: 'H2 with disk-based persistence',
          },
          {
            value: H2_MEMORY,
            name: 'H2 with in-memory persistence',
          },
        ].concat(SQL_DB_OPTIONS.find(it => it.value === response.prodDatabaseType)),
      default: H2_DISK,
    },
    {
      when: answers => !answers.reactive,
      type: 'list',
      name: CACHE_PROVIDER,
      message: 'Which cache do you want to use? (Spring cache abstraction)',
      choices: [
        {
          value: EHCACHE,
          name: 'Ehcache (local cache, for a single node)',
        },
        {
          value: CAFFEINE,
          name: 'Caffeine (local cache, for a single node)',
        },
        {
          value: HAZELCAST,
          name: 'Hazelcast (distributed cache, for multiple nodes, supports rate-limiting for gateway applications)',
        },
        {
          value: INFINISPAN,
          name: 'Infinispan (hybrid cache, for multiple nodes)',
        },
        {
          value: MEMCACHED,
          name: 'Memcached (distributed cache) - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
        {
          value: REDIS,
          name: 'Redis (distributed cache)',
        },
        {
          value: NO_CACHE_PROVIDER,
          name: 'No cache - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
      ],
      default: EHCACHE,
    },
    {
      when: answers =>
        ((answers.cacheProvider !== NO_CACHE_PROVIDER && answers.cacheProvider !== MEMCACHED) || applicationType === GATEWAY) &&
        answers.databaseType === SQL &&
        !answers.reactive,
      type: 'confirm',
      name: 'enableHibernateCache',
      message: 'Do you want to use Hibernate 2nd level cache?',
      default: true,
    },
    {
      type: 'list',
      name: BUILD_TOOL,
      message: 'Would you like to use Maven or Gradle for building the backend?',
      choices: [
        {
          value: MAVEN,
          name: 'Maven',
        },
        {
          value: GRADLE,
          name: 'Gradle',
        },
      ],
      default: MAVEN,
    },
    {
      when: answers => answers.buildTool === GRADLE && this.options.experimental,
      type: 'confirm',
      name: 'enableGradleEnterprise',
      message: 'Do you want to enable Gradle Enterprise integration?',
      default: false,
    },
    {
      when: answers => answers.enableGradleEnterprise,
      type: 'input',
      name: 'gradleEnterpriseHost',
      message: 'Enter your Gradle Enterprise host',
      validate: input => (input.length === 0 ? 'Please enter your Gradle Enterprise host' : true),
    },
    {
      when: applicationType === MONOLITH,
      type: 'list',
      name: SERVICE_DISCOVERY_TYPE,
      message: 'Do you want to use the JHipster Registry to configure, monitor and scale your application?',
      choices: [
        {
          value: NO_SERVICE_DISCOVERY,
          name: 'No',
        },
        {
          value: EUREKA,
          name: 'Yes',
        },
      ],
      default: NO_SERVICE_DISCOVERY
    },
  ];

  return this.prompt(prompts).then(answers => {
    this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = answers.serviceDiscoveryType;
    if (this.jhipsterConfig.applicationType === GATEWAY) {
      this.reactive = this.jhipsterConfig.reactive = answers.reactive = true;
    } else {
      this.reactive = this.jhipsterConfig.reactive = answers.reactive;
    }
    this.authenticationType = this.jhipsterConfig.authenticationType = OAUTH2;

    this.packageName = this.jhipsterConfig.packageName = answers.packageName;
    this.serverPort = this.jhipsterConfig.serverPort = answers.serverPort || '8080';
    this.cacheProvider = this.jhipsterConfig.cacheProvider = !answers.reactive ? answers.cacheProvider : NO_CACHE_PROVIDER;
    this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache = !!answers.enableHibernateCache;

    const { databaseType } = answers;
    this.databaseType = this.jhipsterConfig.databaseType = databaseType;
    this.devDatabaseType = this.jhipsterConfig.devDatabaseType = answers.devDatabaseType || databaseType;
    this.prodDatabaseType = this.jhipsterConfig.prodDatabaseType = answers.prodDatabaseType || databaseType;
    this.searchEngine = this.jhipsterConfig.searchEngine = answers.searchEngine;
    this.buildTool = this.jhipsterConfig.buildTool = answers.buildTool;
    this.enableGradleEnterprise = this.jhipsterConfig.enableGradleEnterprise = answers.enableGradleEnterprise;
    this.gradleEnterpriseHost = this.jhipsterConfig.gradleEnterpriseHost = answers.gradleEnterpriseHost;
  });
}