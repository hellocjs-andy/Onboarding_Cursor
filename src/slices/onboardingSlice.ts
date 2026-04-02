import { createSlice } from '@reduxjs/toolkit';

/** Placeholder slice — legacy DOM state lives in `onboardingRuntime`; extend here when migrating off inline HTML. */
const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    hydrated: true,
  },
  reducers: {},
});

export default onboardingSlice.reducer;
