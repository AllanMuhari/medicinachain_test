import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function RecipeList({
  recipes,
  onRecipeClick,
  onToggleFavorite,
  onDeleteRecipe,
  onEditRecipe,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Recipes
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 3,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
        }}
      />
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <List>
          {filteredRecipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              disablePadding
              secondaryAction={
                <Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(recipe.id);
                    }}
                    edge="end"
                    sx={{
                      color: recipe.favorite ? "error.main" : "text.secondary",
                    }}>
                    {recipe.favorite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditRecipe(recipe);
                    }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteRecipe(recipe.id);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}>
              <ListItemButton
                onClick={() => onRecipeClick(recipe)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: 2,
                  width: "100%",
                  "& .MuiListItemText-root": {
                    width: "100%",
                    mr: { xs: 8, sm: 12 },
                  },
                }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      color="text.primary"
                      sx={{
                        fontSize: {
                          xs: "0.9rem",
                          sm: "1.1rem",
                        },
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: {
                          xs: "180px",
                          sm: "300px",
                        },
                      }}>
                      {recipe.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.875rem",
                        },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: {
                          xs: "180px",
                          sm: "300px",
                        },
                      }}>
                      {recipe.description}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      {filteredRecipes.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
          No recipes found
        </Typography>
      )}
    </Box>
  );
}

export default RecipeList;
