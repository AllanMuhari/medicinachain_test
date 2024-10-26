import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
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
        <DialogTitle>
          <Typography variant="h5" color="primary" align="center">
            Add New Recipe
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
            <TextField
              label="Recipe Name"
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              value={recipe.description}
              onChange={(e) =>
                setRecipe({ ...recipe, description: e.target.value })
              }
              required
              fullWidth
              variant="outlined"
              multiline
              rows={2}
            />
            <TextField
              label="Ingredients (comma-separated)"
              value={recipe.ingredients}
              onChange={(e) =>
                setRecipe({ ...recipe, ingredients: e.target.value })
              }
              required
              fullWidth
              variant="outlined"
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
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2, p: 2 }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Recipe
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddRecipeForm;
