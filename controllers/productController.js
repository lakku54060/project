const Product = require("../models/product");
const { publicApiBaseUrl } = require("../config/env");

function normalizeSizes(inputSizes) {
  if (Array.isArray(inputSizes)) {
    const cleaned = inputSizes
      .map((size) => String(size).trim())
      .filter(Boolean);

    return cleaned.length ? cleaned : ["Free Size"];
  }

  if (typeof inputSizes === "string") {
    const cleaned = inputSizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean);

    return cleaned.length ? cleaned : ["Free Size"];
  }

  return ["Free Size"];
}

function normalizeProductImagePath(inputPath) {
  const rawPath = String(inputPath || "").trim();

  if (!rawPath) {
    return rawPath;
  }

  if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
    return rawPath;
  }

  const normalized = rawPath.replace(/\\/g, "/");
  const imageName = normalized.split("/").pop();

  if (normalized.includes("productimages/") && imageName) {
    return `/productimages/${imageName}`;
  }

  return rawPath;
}

function getRequestBaseUrl(req) {
  if (publicApiBaseUrl) {
    return publicApiBaseUrl;
  }

  return `${req.protocol}://${req.get("host")}`;
}

function formatProduct(req, productDoc) {
  const product = productDoc.toObject ? productDoc.toObject() : { ...productDoc };
  const normalizedImage = normalizeProductImagePath(product.pimage);
  const imageName = String(normalizedImage || "").split("/").pop();

  return {
    ...product,
    pimage:
      normalizedImage.startsWith("/productimages/") && imageName
        ? `${getRequestBaseUrl(req)}/productimages/${imageName}`
        : normalizedImage,
    category: product.category || "General",
    gender: product.gender || "Unisex",
    sizes: Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ["Free Size"],
  };
}

function buildProductPayload(body) {
  return {
    name: String(body.name || "").trim(),
    price: Number(body.price),
    description: String(body.description || "").trim(),
    pimage: normalizeProductImagePath(body.pimage),
    category: String(body.category || "General").trim() || "General",
    gender: String(body.gender || "Unisex").trim() || "Unisex",
    sizes: normalizeSizes(body.sizes),
  };
}

exports.getAllProducts = async (req, res) => {
  try {
    const productres = await Product.find().sort({ createdAt: -1, _id: -1 });
    res.json(productres.map((product) => formatProduct(req, product)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const payload = buildProductPayload(req.body);

    if (!payload.name || !payload.price || !payload.description || !payload.pimage) {
      return res.status(400).json({ message: "All product fields are required" });
    }

    if (Number.isNaN(payload.price)) {
      return res.status(400).json({ message: "Price must be numeric" });
    }

    const pitems = new Product(payload);
    const productres = await pitems.save();

    if (!productres) {
      return res.status(404).json({ message: "Product not inserted" });
    }

    res.json(formatProduct(req, productres));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = buildProductPayload(req.body);

    if (!payload.name || !payload.price || !payload.description || !payload.pimage) {
      return res.status(400).json({ message: "All product fields are required" });
    }

    if (Number.isNaN(payload.price)) {
      return res.status(400).json({ message: "Price must be numeric" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(formatProduct(req, updatedProduct));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(formatProduct(req, product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
