import { trpc } from "./trpc";

export function View() {
    const { mutateAsync: test } = trpc.test.useMutation();

    trpc.onTest.useSubscription(undefined, {
        onData: (data) => {
            console.log("-->   ~ data:", data);
        },
    });

    return <button onClick={() => test()}>test</button>;
}
