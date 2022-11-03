const { db } = require("../configs/firebase");

exports.checkID = async (req, res, next) => {
  const snapshotRef = db.collection("users").doc(req.params.id);
  const snapshot = await snapshotRef.get();

  req.snapshotRef = snapshotRef;
  req.snapshot = snapshot;

  if (!snapshot.exists) {
    // console.log("No such document!");
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};

exports.getAllUser = async (req, res) => {
  const snapshot = await db.collection("users").get();

  let users = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    users.push({ id, ...data });
  });

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const snapshot = req.snapshot;

  const userId = snapshot.id;
  const userData = snapshot.data();

  res.status(200).json({
    status: "success",
    data: {
      user: { id: userId, ...userData },
    },
  });
};

exports.createUser = async (req, res) => {
  const user = req.body;

  await db.collection("users").add(user);

  res.status(201).json({
    status: "Success",
    data: {
      user,
    },
  });
};

exports.updateUser = async (req, res) => {
  const body = req.body;

  await req.snapshotRef.update(body);

  res.status(200).json({
    status: "Success",
    data: {
      user: "Updated ...",
    },
  });
};

exports.deleteUser = async (req, res) => {
  await req.snapshotRef.delete();

  res.status(204).json({
    status: "success",
    data: null,
  });
};
