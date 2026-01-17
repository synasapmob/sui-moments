module sui_moments::utility;

use std::string;

public(package) fun extract_blob_metadata(
    mut blob: walrus::blob::Blob,
    mut fields: vector<string::String>,
): (vector<Option<string::String>>, walrus::blob::Blob) {
    let mut metadata = blob.take_metadata();
    let mut options = vector::empty<Option<string::String>>();

    // get all fields
    let mut i = fields.length();
    while (i > 0) {
        let field = fields.pop_back();
        let result = metadata.remove_if_exists(&field);

        options.push_back(result);

        i = i - 1;
    };

    (options, blob)
}
