import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";

const initialRecipes = [
  {
    id: 1,
    name: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish",
    ingredients: [
      "spaghetti",
      "eggs",
      "pecorino cheese",
      "guanciale",
      "black pepper",
    ],
    instructions:
      "Cook pasta, mix eggs with cheese, combine with hot pasta, add crispy guanciale and pepper.",
    favorite: false,
  },
  {
    id: 2,
    name: "Chicken Curry",
    description: "A flavorful Indian-inspired curry",
    ingredients: [
      "chicken",
      "onions",
      "tomatoes",
      "curry powder",
      "coconut milk",
    ],
    instructions:
      "Sauté onions, add chicken and spices, simmer with coconut milk until cooked.",
    favorite: false,
  },
];

function App() {
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : initialRecipes;
  });
  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: recipes.length ? Math.max(recipes.map((r) => r.id)) + 1 : 1,
    };
    setRecipes([...recipes, recipeWithId]);
    setOpenAddForm(false);
  };

  const handleEditRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setSelectedRecipe(updatedRecipe);
  };

  const handleDeleteRecipe = (id) => {
    setRecipeToDelete(recipes.find((recipe) => recipe.id === id));
    setOpenDeleteDialog(true);
  };

  const confirmDeleteRecipe = () => {
    if (recipeToDelete) {
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeToDelete.id));
      setSnackbar({
        open: true,
        message: `${recipeToDelete.name} deleted successfully!`,
        severity: "success",
      });
      setSelectedRecipe(null);
      setRecipeToDelete(null);
    }
    setOpenDeleteDialog(false);
  };

  const handleToggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  const filteredRecipes =
    filter === "favorites"
      ? recipes.filter((recipe) => recipe.favorite)
      : recipes;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe Book
          </Typography>
          <Button color="inherit" onClick={() => setOpenAddForm(true)}>
            Add Recipe
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
            aria-label="recipe filter">
            <ToggleButton value="all">All Recipes</ToggleButton>
            <ToggleButton value="favorites">Favorites</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <RecipeList
          recipes={filteredRecipes}
          onRecipeClick={setSelectedRecipe}
          onToggleFavorite={handleToggleFavorite}
          onDeleteRecipe={handleDeleteRecipe}
          onEditRecipe={handleEditRecipe}
        />

        <AddRecipeForm
          open={openAddForm}
          onClose={() => setOpenAddForm(false)}
          onAdd={handleAddRecipe}
        />

        <RecipeDetails
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{" "}
              {recipeToDelete ? recipeToDelete.name : ""}? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteRecipe} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default App;
