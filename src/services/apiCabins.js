import supabase, { supabaseUrl } from "./supabase";

function setImageName(name) {
    return `${Math.random()}-${name}`.replaceAll("/", "");
}

function setImagePath(imageName) {
    return `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
}

/* 
    preparedImages = {
        fileUpload: [
            {
                file:File,
                name:setImageName(name)
            }
        ],
        dbInsert: [
            {
                cabin_id
            }
        ]
    }
 */

export function prepareImages(images, cabinId) {
    const uploadImgs = [];
    const dbImages = [];

    images.forEach((img) => {
        if (img.file) {
            const imgName = setImageName(img.name);
            const imgPath = setImagePath(imgName);

            uploadImgs.push({
                name: imgName,
                file: img.file,
            });

            dbImages.push({
                name: imgName,
                cabin_id: cabinId,
                image: imgPath,
            });
        } else {
            dbImages.push({
                name: img.name,
                cabin_id: cabinId,
                image: img.image,
            });
        }
    });

    return {
        uploadImgs,
        dbImages,
    };
}

export async function getCabins({
    search,
    ids,
    facilities,
    range,
    guests,
    property,
}) {
    let query = supabase
        .from("cabins")
        .select("*,reviews(*), cabins_facilities(facilities(*)), images(*)")
        .order("id", { ascending: false });

    if (range) {
        const [min, max] = range;

        if (max > 0) {
            query = query.gt("regularPrice", min).lt("regularPrice", max);
        } else {
            query = query.gt("regularPrice", min);
        }
    }

    if (property) {
        query = query.eq("property", property);
    }

    if (guests) {
        query = query.gte("maxCapacity", guests);
    }

    // if(facilities) {
    //     query = query.select('*,reviews(*), cabins_facilities!inner(facilities(*)), images(*)')
    //     .order('id',{ascending:false})
    // }

    if (ids) query = query.in("id", ids);

    if (search) query = query.ilike("location", `%${search}%`);

    const { data, error } = await query;

    if (error) {
        console.error(error);
        throw new Error("Cabbins could not be loaded");
    }

    return data;
}

export async function getCabinsSuggestions({ search }) {
    const { data, error } = await supabase.rpc("get_suggestions", { search });

    if (error) {
        return new Error("Culd not fetch suggestions");
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
}

// export async function createEditCabin(newCabin, id) {
//     const images = newCabin.images;

//     const { dbImages, uploadImgs } = prepareImages(images);
// }

export async function createEditCabin(newCabin, id) {
    const newFacilities = [...newCabin.facilities];
    const images = newCabin.images;

    // const imgPromises = images.map(img=> supabase.storage.from('cabin-images').upload(setImageName(img.name),img.file) )

    // const imgResponse = await Promise.all(imgPromises)

    newCabin.facilities && delete newCabin.facilities;
    newCabin.cabins_facilities && delete newCabin.cabins_facilities;
    newCabin?.reviews && delete newCabin.reviews;
    newCabin?.images && delete newCabin.images;
    newCabin?.image && delete newCabin.image;

    // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    //     "/",
    //     ""
    // );

    // const imagePath = hasImagePath
    //     ? newCabin.image
    //     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin
    let query = supabase.from("cabins");

    // A) CREATE
    // if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
    if (!id) query = query.insert([{ ...newCabin }]);

    // B) UPDATE
    if (id) query = query.update({ ...newCabin }).eq("id", id);

    const { error, data } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }

    // 2a. Update cabin facilities

    const facilities = newFacilities.map((facility) => {
        return {
            facility_id: Number(facility),
            cabin_id: Number(id || data.id),
        };
    });

    await supabase.from("cabins_facilities").delete().eq("cabin_id", id);

    const { error: savingFacilitiesError, data: savedFacilities } =
        await supabase.from("cabins_facilities").insert(facilities).select();

    ////////////////////////// 2. Upload images ///////////////////

    if (id) {
        await supabase.from("images").delete().eq("cabin_id", id);
    }

    const { dbImages, uploadImgs } = prepareImages(images, data.id);
    // if (hasImagePath) return data;

    const imgPromises = uploadImgs.map(({ name, file }) =>
        supabase.storage.from("cabin-images").upload(name, file)
    );

    const imgResponse = await Promise.all(imgPromises);

    console.log(imgResponse);

    const storageError = imgResponse.every((img) => img.error !== null);

    console.log(storageError);

    //insert images to database
    const { data: databaseImgs, error: insertDbImages } = await supabase
        .from("images")
        .insert(dbImages)
        .select();

    console.log(databaseImgs);

    // const { error: storageError } = await supabase.storage
    //     .from("cabin-images")
    //     .upload(imageName, newCabin.image);

    // 4. Delete cabin if there was an storage error

    // if (storageError) {
    //     await supabase.from("cabins").delete().eq("id", data.id);
    //     console.error(storageError);
    //     throw new Error(
    //         "Cabin image could not be uploaded and the cabin was not created"
    //     );
    // }

    return data;
}

export async function getCabin(id, options) {
    const { data: cabin, error } = await supabase
        .from("cabins")
        .select(
            "*,profile(*), reviews(*,profile(display_name,avatar)),cabins_facilities(facilities(*)),images(*),cabin_bookings:bookings!left(*)"
        )
        .eq("id", id)
        // .in('cabin_bookings.guestId', ["b4270ca1-7bef-4301-b9a9-e75b574e02c6"])
        .single();

    if (error) {
        console.error(error);
        throw new Error("Cabin not found");
    }

    return cabin;
}
