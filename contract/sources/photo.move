// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module sui_moments::photo;

use std::string::{String, utf8};
use sui::clock::Clock;
use sui::event;
use sui_moments::utility::extract_blob_metadata;

public struct Photo has key {
    id: UID,
    blob_id: u256,
    creator: address,
}

public struct PhotoEvent has copy, drop {
    created_at: u64,
    blob_id: u256,
    creator: address,
    creator_suins_name: Option<String>,
    creator_suins_avatar: Option<String>,
}

// Add this public function to expose the UID
public fun borrow_uid_mut(photo: &mut Photo): &mut UID {
    &mut photo.id
}

#[allow(lint(self_transfer))]
public fun upload_photo(blob: walrus::blob::Blob, clock: &Clock, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);

    let photo = Photo {
        id: object::new(ctx),
        blob_id: blob.blob_id(),
        creator: sender,
    };

    let (mut blob_metadata, blob) = extract_blob_metadata(
        blob,
        vector[utf8(b"creator_suins_name"), utf8(b"creator_suins_avatar")],
    );

    // Pop the values out (in reverse order of how they were pushed)
    let creator_suins_avatar = blob_metadata.pop_back();
    let creator_suins_name = blob_metadata.pop_back();
    blob_metadata.destroy_empty();

    // Emit the event
    event::emit(PhotoEvent {
        created_at: clock.timestamp_ms(),
        blob_id: photo.blob_id,
        creator: photo.creator,
        creator_suins_name,
        creator_suins_avatar,
    });

    transfer::share_object(photo);
    transfer::public_transfer(blob, sender)
}
