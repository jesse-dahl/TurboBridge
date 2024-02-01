SHELL := /bin/bash
#==================================================================================
# Development
#==================================================================================

killall:
	 lsof -nti:3001 | xargs kill -9
	 lsof -nti:3002 | xargs kill -9
	 lsof -nti:5556 | xargs kill -9
	 lsof -nti:5557 | xargs kill -9

cid:
	turbo clean
	pnpm install
	turbo db:generate
	turbo db:push
	turbo build
	make gen-env-types

gen-env-types:
	ts-node --esm packages/config/env/src/env.types.generator.ts > packages/config/env/src/env.types.ts
