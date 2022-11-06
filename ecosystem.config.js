export default {
    apps: [
        {
            name: "[DEV] Shortly FrontEnd",
            script: 'npm run preview',
            watch: '.',
            env: {
                API_BASE: "http://localhost:32512"
            },
        },
    ],
};
