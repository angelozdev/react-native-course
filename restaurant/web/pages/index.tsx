import { db } from "firebase-client";
import React from "react";
import { dishesService } from "services";

export default function Home() {
  React.useEffect(() => {
    dishesService.getAll();
  }, []);

  return (
    <div className="p-4">
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
      <h1>Hello Next.js</h1>
    </div>
  );
}
