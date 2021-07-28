# Hierarchical Timing Wheel
Exploration into hierarchical timing wheels. Currently just a naive implementation, but promotes overflow events correctly.

## Todo
- Tests
- ~~Convert buckets to linked-lists~~
- Priority queue for event execution to maintain order (expiration + insertion)
- DRY it up
- Persistence for timer and event queue state (timer needs to be able to contine where it left off after it the service is shut down)
- Find a better way to handle deletion and scheduling
- (?) Dynamically able to create overflow wheel
 
