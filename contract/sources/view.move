// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module sui_moments::view;

use sui::clock::Clock;
use sui::dynamic_field;
use sui::event;
use sui_moments::photo::{Self, Photo};

public struct View has drop, store {
    creator: address,
    created_at: u64,
}

public struct ViewEvent has copy, drop {
    creator: address,
    created_at: u64,
}

public fun view_photo(photo: &mut Photo, clock: &Clock, ctx: &mut TxContext) {
    let sender = ctx.sender();

    // Only add if not already viewed
    let photo_uid = photo::borrow_uid_mut(photo);
    if (!dynamic_field::exists_(photo_uid, sender)) {
        let view = View {
            creator: sender,
            created_at: clock.timestamp_ms(),
        };

        event::emit(ViewEvent {
            creator: view.creator,
            created_at: view.created_at,
        });

        dynamic_field::add(photo_uid, sender, view)
    }
}
