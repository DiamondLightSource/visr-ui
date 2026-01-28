// src/hooks/useWorkflowArtifacts.test.tsx
import React, { createElement, type PropsWithChildren } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { useWorkflowArtifacts } from './useWorkflowArtifacts';
import { getRelayEnvironment } from '../RelayEnvironment';
import { setupServer } from 'msw/node';

// let viRequestSubscriptionMock = vi.fn();

// vi.mock('relay-runtime', async () => {
// return {
//     requestSubscription: viRequestSubscriptionMock,
// };
// });

describe('useWorkflowArtifacts', async () => {

    const { createGraphQlSubscriptionHandlers } = await import("../mocks/handlers");
    const handlers = createGraphQlSubscriptionHandlers();
    const server = setupServer(handlers);

    const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
        let environment = getRelayEnvironment();
        return createElement(RelayEnvironmentProvider, { environment: environment, children:children});
    }

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

  let latestConfig: any;
  let latestDisposable: { dispose: ReturnType<typeof vi.fn> };

//   beforeEach(() => {
//     vi.resetAllMocks();
//     latestConfig = undefined;
//     latestDisposable = { dispose: vi.fn() };
//     requestSubscriptionMock.mockImplementation((_env: any, config: any) => {
//       latestConfig = config;
//       return latestDisposable;
//     });
//   });

//   it('returns [] and does not subscribe when visit is null/invalid', () => {
//     const { result } = renderHook(() => useWorkflowArtifacts(null, 'workflow-name'), { wrapper });
//     expect(result.current).toEqual([]);
//     expect(requestSubscriptionMock).not.toHaveBeenCalled();
//   });

//   it('returns [] and does not subscribe when name is blank', () => {
//     const visit: any = { number: 1, proposalCode: 'cm', proposalNumber: 40661 };
//     const { result } = renderHook(() => useWorkflowArtifacts(visit, '  '), { wrapper });
//     expect(result.current).toEqual([]);
//     expect(requestSubscriptionMock).not.toHaveBeenCalled();
//   });

  it('subscribes with correct variables when enabled and flattens artifacts from tasks', async () => {
    const visit: any = { number: 1, proposalCode: 'cm', proposalNumber: 40661 };
    const name = 'visr-reconstruction';

    const { result } = renderHook(
      () => useWorkflowArtifacts(visit, name),
      { wrapper }
    );

    // // Subscription called once with the environment and expected variables
    // expect(requestSubscriptionMock).toHaveBeenCalledTimes(1);
    // const [, configArg] = requestSubscriptionMock.mock.calls[0]; // (environment, config)
    // expect(configArg.variables).toEqual({ visit, name });

    const expected = [{"name": "visr-reconstructed-image.png", "url": "https://sci-nas-s3.diamond.ac.uk/k8s-workflows-test/visr-reconstruction-ws7fl/visr-reconstruction-ws7fl/visr-reconstructed-image.png", "mimeType": "image/png"}, {"name": "main.log", "url": "https://sci-nas-s3.diamond.ac.uk/k8s-workflows-test/visr-reconstruction-ws7fl/visr-reconstruction-ws7fl/main.log", "mimeType": "text/plain"}];

    await waitFor(() => {
      expect(result.current).toEqual(expected);
    });
  });

//   it('handles nullish tasks/artifacts and falls back to []', async () => {
//     const visit: any = { number: 1, proposalCode: 'cm', proposalNumber: 40661 };
//     const name = 'any';

//     const { result } = renderHook(
//       () => useWorkflowArtifacts(visit, name),
//       { wrapper }
//     );

//     // // tasks undefined
//     // act(() => {
//     //   latestConfig.onNext({
//     //     workflow: {
//     //       status: {
//     //         // no tasks
//     //       },
//     //     },
//     //   });
//     // });

//     await waitFor(() => {
//       expect(result.current).toEqual([]);
//     });

//     // tasks present but artifacts null/undefined
//     act(() => {
//       latestConfig.onNext({
//         workflow: {
//           status: {
//             tasks: [
//               { artifacts: null },
//               null,
//               { artifacts: undefined },
//             ],
//           },
//         },
//       });
//     });

//     await waitFor(() => {
//       expect(result.current).toEqual([]);
//     });
//   });

//   it('cleans up subscription on unmount (dispose is called)', () => {
//     const visit: any = { number: 1, proposalCode: 'cm', proposalNumber: 40661 };
//     const name = 'something';

//     const { unmount } = renderHook(
//       () => useWorkflowArtifacts(visit, name),
//       { wrapper }
//     );

//     expect(requestSubscriptionMock).toHaveBeenCalledTimes(1);
//     expect(latestDisposable.dispose).not.toHaveBeenCalled();

//     unmount();
//     expect(latestDisposable.dispose).toHaveBeenCalledTimes(1);
//   });

//   it('re-subscribes and disposes previous subscription when visit or name changes', () => {
//     const visit1: any = { number: 1, proposalCode: 'cm', proposalNumber: 40661 };
//     const visit2: any = { number: 2, proposalCode: 'cm', proposalNumber: 40661 };

//     const { rerender } = renderHook(
//       ({ visit, name }: { visit: any; name: string }) => useWorkflowArtifacts(visit, name),
//       { initialProps: { visit: visit1, name: 'first' }, wrapper }
//     );

//     expect(requestSubscriptionMock).toHaveBeenCalledTimes(1);
//     expect(latestDisposable.dispose).not.toHaveBeenCalled();

//     // Change name → should dispose old and create new subscription
//     rerender({ visit: visit1, name: 'second' });
//     expect(requestSubscriptionMock).toHaveBeenCalledTimes(2);
//     expect(latestDisposable.dispose).toHaveBeenCalledTimes(1); // disposed the previous

//     // Change visit → should dispose old and create new subscription
//     const previousDispose = latestDisposable.dispose; // track before next change
//     rerender({ visit: visit2, name: 'second' });
//     expect(requestSubscriptionMock).toHaveBeenCalledTimes(3);
//     // previous subscription must have been disposed again (second one)
//     expect(previousDispose).toHaveBeenCalled();
//   });
});