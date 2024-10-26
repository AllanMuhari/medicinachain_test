import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function RecipeList({ recipes, onRecipeClick, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {filteredRecipes.map((recipe) => (
          <ListItem
            key={recipe.id}
            disablePadding
            secondaryAction={
              <FavoriteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(recipe.id);
                }}
                color={recipe.favorite ? "error" : "disabled"}
                sx={{ cursor: "pointer" }}
              />
            }>
            <ListItemButton onClick={() => onRecipeClick(recipe)}>
              <ListItemText
                primary={recipe.name}
                secondary={recipe.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {filteredRecipes.length === 0 && (
        <Typography align="center" color="text.secondary">
          No recipes found
        </Typography>
      )}
    </Box>
  );
}

export default RecipeList;
