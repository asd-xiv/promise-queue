import { findWith, last, is, isEmpty, isDeepEqual, isEqual } from "@asd14/m"

/**
 * Self popping promise based job queue
 *
 * @returns {{ push }}
 *
 * @example
 * const queue = buildQueue()
 *
 * queue.push({
 *   fn: Users.login,
 *   params:[{
 *     body: {email: "lorem@test.com", password: "secret"}
 *   }]
 * })
 * .then(...)
 * .catch(...)
 */

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

type BuildQueueType = (props?: { shouldReuseExisting?: boolean }) => {
  push: <F extends (...params: any[]) => any>(input: {
    fn: F
    params: Parameters<F>
  }) => Promise<Awaited<ReturnType<F>>>
}

type JobType = {
  fn: (...params: any[]) => any
  params: any[]
  fnPromise: Promise<any>
  onResolve: (result: any) => any
  onReject: (error: any) => any
}

export const buildQueue: BuildQueueType = (props = {}) => {
  const { shouldReuseExisting = true } = props
  const runningJobs: JobType[] = []
  let isProcessing = false

  const pop = () => {
    if (isProcessing || isEmpty(runningJobs)) {
      return undefined
    }

    const { fn, params, onResolve, onReject } = last(runningJobs)

    isProcessing = true

    return Promise.resolve()
      .then(() => fn(...params))
      .then(result => {
        // The queue makes sure the "fn" runs in sequence,
        // not also whatever the resolve/reject workload represents
        runningJobs.pop()

        // Once the main "fn" is done we can remove ourself and
        // allow the queue to process other jobs.
        isProcessing = false

        return onResolve(result)
      })
      .catch(onReject)
      .finally(() => {
        pop()
      })
  }

  return {
    push: ({ fn, params }) => {
      if (shouldReuseExisting) {
        const existingJob = findWith({
          fn: isEqual(fn),
          params: isDeepEqual(params),
        })(runningJobs)

        if (is(existingJob)) {
          return existingJob.fnPromise
        }
      }

      let deferredResolve: (result: any) => any
      let deferredReject: (error: any) => any

      const fnPromise = new Promise((resolve, reject) => {
        deferredResolve = resolve
        deferredReject = reject
      })

      runningJobs.unshift({
        fn,
        params,
        fnPromise,
        onResolve: deferredResolve,
        onReject: deferredReject,
      })

      pop()

      return fnPromise
    },
  }
}
