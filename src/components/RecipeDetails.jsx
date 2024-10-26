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
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function RecipeDetails({ recipe, open, onClose }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: isSmallScreen ? "100%" : "auto",
          margin: isSmallScreen ? 1 : 2,
          maxHeight: "90vh",
        },
      }}>
      <DialogTitle>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          align="center"
          color="primary">
          {recipe.name}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: isSmallScreen ? 1 : 2 }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: isSmallScreen ? "0.875rem" : "1rem" }}>
            {recipe.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              color: "text.primary",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}>
            Ingredients
          </Typography>
          <List dense sx={{ ml: isSmallScreen ? -1 : 0 }}>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}>
            Instructions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              lineHeight: 1.6,
              fontSize: isSmallScreen ? "0.875rem" : "1rem",
            }}>
            {recipe.instructions}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "center", p: isSmallScreen ? 1 : 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          size={isSmallScreen ? "small" : "medium"}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecipeDetails;
