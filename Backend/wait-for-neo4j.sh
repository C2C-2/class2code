# wait-for-neo4j.sh
#!/bin/sh

set -e

until curl -s http://neo4j:7474; do
    echo >&2 "Neo4j is unavailable - sleeping"
    sleep 1
done

echo >&2 "Neo4j is up - executing command"
exec "$@"
