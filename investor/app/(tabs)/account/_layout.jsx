import { Stack } from "expo-router";

export default function TravelLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
            headerTitle: "Browse Products",
            headerTitleAlign: "center",
            headerStyle: {
              height: 80,
              backgroundColor: "#0a0f1a"
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF"
            },
        }}
      />
      <Stack.Screen
        name="productdetails"
        options={{
          headerTitle: "Product Details",
          headerTitleAlign: "center",
          headerStyle: {
            height: 80,
            backgroundColor: "#0a0f1a"
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#FFFFFF"
          },
        }}
      />
    </Stack>
  );
}
