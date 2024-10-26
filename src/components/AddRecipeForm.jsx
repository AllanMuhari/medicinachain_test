import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

function AddRecipeForm({ open, onClose, onAdd }) {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...recipe,
      id: Date.now(),
      ingredients: recipe.ingredients.split(",").map((i) => i.trim()),
      favorite: false,
    });
    setRecipe({ name: "", description: "", ingredients: "", instructions: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Recipe</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Recipe Name"
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              required
            />
            <TextField
              label="Description"
              value={recipe.description}
              onChange={(e) =>
                setRecipe({ ...recipe, description: e.target.value })
              }
              required
            />
            <TextField
              label="Ingredients (comma-separated)"
              value={recipe.ingredients}
              onChange={(e) =>
                setRecipe({ ...recipe, ingredients: e.target.value })
              }
              required
              multiline
              rows={3}
            />
            <TextField
              label="Instructions"
              value={recipe.instructions}
              onChange={(e) =>
                setRecipe({ ...recipe, instructions: e.target.value })
              }
              required
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add Recipe
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddRecipeForm;
