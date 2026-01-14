## High-level requirement

- photo

1. take a photo (created_at, creator, avatar, name)
2. reaction a photo (created_at, creator, avatar, name, reaction-icon)

- Histories

1. take a photo (created_at, photo)
2. Post Activity (created_at, creator, avatar, name, reaction-icon)
3. Message inbox (id)
4. Messages box (used **getChannelMessages** supported by SDK)
5. upload emoji (blob_id)

## Documentations

- https://github.com/MystenLabs/sui-stack-messaging-sdk
