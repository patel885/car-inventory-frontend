import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Brief } from "@/pages/Brief";
import { CarInventory } from "@/features/cars/components/CarInventory";

/**
 * Add routes for your own pages here. `/` is the brief; you are free to move
 * it to `/brief` and put your work on `/`.
 */
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CarInventory />} />
      <Route path="/brief" element={<Brief />} />
    </Routes>
  </BrowserRouter>
);
