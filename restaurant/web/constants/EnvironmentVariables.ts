const { NEXT_PUBLIC_FIREBASE_CONFIG } = process.env;

const EnvironmentVariables = {
  firebase: {
    config: NEXT_PUBLIC_FIREBASE_CONFIG,
  },
};

export default EnvironmentVariables;
