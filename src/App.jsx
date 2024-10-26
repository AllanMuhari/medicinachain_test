import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
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
  const [recipes, setRecipes] = useState(initialRecipes);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
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
      </Container>
    </Box>
  );
}

export default App;
