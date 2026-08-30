import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

// Analytics needs a real browser measurement context, so stub the SDK surface
// App touches at module load.
vi.mock("firebase/app", () => ({ initializeApp: () => ({}) }));
vi.mock("firebase/analytics", () => ({ getAnalytics: () => ({}) }));

test("mounts the app shell under the router", async () => {
  render(<App />);

  // The menu is the part of the shell that renders without waiting on network.
  expect(await screen.findAllByText("เกี่ยวกับ")).not.toHaveLength(0);
  expect(screen.getAllByText("หน้าแรก")).not.toHaveLength(0);
  expect(screen.getAllByText("ฟังเสียง")).not.toHaveLength(0);
});
