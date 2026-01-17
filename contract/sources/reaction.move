// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module sui_moments::reaction;

use std::string::String;
use sui::clock::Clock;
use sui::dynamic_field;
use sui::event;
use sui_moments::photo::{Self, Photo};

const EAlreadyLiked: u64 = 1;

public struct Reaction has drop, store {
    creator: address,
    created_at: u64,
    path: String, // for E.g: heart/like/haha/cry
    status: u64, // 0 = like, 1 = unlike
}

public struct ReactionEvent has copy, drop {
    creator: address,
    created_at: u64,
    path: String, // for E.g: heart/like/haha/cry
    status: u64, // 0 = yes, 1 = no
}

public fun reaction(photo: &mut Photo, clock: &Clock, path: String, ctx: &mut TxContext) {
    let sender = ctx.sender();
    let created_at = clock.timestamp_ms();

    // Check if already liked
    let photo_uid = photo::borrow_uid_mut(photo);
    assert!(!dynamic_field::exists_(photo_uid, sender), EAlreadyLiked);

    let reaction = Reaction {
        creator: sender,
        created_at,
        path,
        status: 1,
    };

    event::emit(ReactionEvent {
        creator: reaction.creator,
        created_at: reaction.created_at,
        path: reaction.path,
        status: reaction.status,
    });

    dynamic_field::add(photo_uid, sender, reaction)
}

public fun un_reaction(photo: &mut Photo, clock: &Clock, ctx: &mut TxContext) {
    let sender = ctx.sender();
    let created_at = clock.timestamp_ms();

    // Check if already liked
    let photo_uid = photo::borrow_uid_mut(photo);
    assert!(!dynamic_field::exists_(photo_uid, sender), EAlreadyLiked);

    let reaction: Reaction = dynamic_field::remove(photo_uid, sender);

    event::emit(ReactionEvent {
        creator: ctx.sender(),
        created_at,
        path: reaction.path,
        status: 0,
    })
}
