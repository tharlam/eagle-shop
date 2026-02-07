// src/pages/api/users.js
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb"; // We need this to read the ID

// 1. POST (Add User) - This stays the same
export const POST = async ({ request }) => {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email) {
        return new Response(JSON.stringify({ error: "Name and Email are required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");
    await db.collection("users").insertOne({
      name: data.name,
      email: data.email,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// 2. DELETE (Remove User) - This is NEW!
export const DELETE = async ({ request }) => {
  try {
    const data = await request.json();
    const userId = data.id;

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");
    
    // We must convert the string ID into a MongoDB ObjectId
    await db.collection("users").deleteOne({
        _id: new ObjectId(userId)
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};