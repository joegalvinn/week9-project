"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { post } from "./PostFormServer";
import "./styles.css";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function PostForm() {
  const [open, setOpen] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    await post(new FormData(event.target));
    setOpen(false);
  }

  return (
    <div className="relative">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div>
          <Dialog.Trigger className="trigger-button">💧</Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Make your Ripple
            </Dialog.Title>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                post(new FormData(event.target)).then(() => setOpen(false));
                wait();
              }}
              className="space-y-2"
            >
              <div className="form-spacing">
                <label className="Label" htmlFor="post">
                  Post:
                </label>
                <input
                  className="Input"
                  type="text"
                  name="post"
                  id="post"
                  required
                />
              </div>
              <div className="form-spacing">
                <label className="Label" htmlFor="image_url">
                  image_url:
                </label>
                <input
                  className="Input"
                  type="text"
                  name="image_url"
                  id="image_url"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <button className="IconButton" type="submit">
                  Post
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
