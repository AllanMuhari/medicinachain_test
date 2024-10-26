import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function RecipeDetails({ recipe, open, onClose }) {
  if (!recipe) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{recipe.name}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          {recipe.description}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Ingredients:
        </Typography>
        <List dense>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Instructions:</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {recipe.instructions}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecipeDetails;
