const Listing =require("../Models/listing");

module.exports.index= async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListings =async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({path :"reviews",populate:{path:"author"},})
  .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you are requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(listing.image);
  res.render("listings/show.ejs", { listing });
}

module.exports.createListing =async (req, res, next) => {

  let url=req.file.path;
  let filename=req.file.filename;
  const newListing = new Listing(req.body.listing);
 newListing.owner = req.user._id;
 newListing.image={url,filename};
 await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
}

module.exports.renderEditForm=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you are requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;

  // Check if it's a Cloudinary URL
  if (originalImageUrl.includes("cloudinary.com")) {
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  } else if (originalImageUrl.includes("unsplash.com")) {
    // Unsplash transformation logic (if supported by Unsplash API)
    originalImageUrl += "&h=300&w=250"; // Adding dimensions as query params
  } else {
    // Default or no transformation for unknown sources
    console.warn("Image URL is from an unsupported source:", originalImageUrl);
  }
 

  res.render("listings/edit.ejs", { listing,originalImageUrl });
}

module.exports.updateListing =async (req, res) => {
  let { id } = req.params;
  let listing =await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){
  let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing =async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
}