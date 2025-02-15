import { Stack } from "expo-router";

export default function TravelLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="invested/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
