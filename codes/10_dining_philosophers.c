// Thread Synchronization and Deadlock Handling (Dining Philosophers)
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

#define N 5

pthread_mutex_t chopstick[N];

void *philosopher(void *arg)
{
    int id = *(int *)arg;

    printf("Philosopher %d is thinking\n", id);
    sleep(1);

    // Pick up left chopstick
    pthread_mutex_lock(&chopstick[id]);
    printf("Philosopher %d picked up left chopstick\n", id);

    // Pick up right chopstick
    pthread_mutex_lock(&chopstick[(id + 1) % N]);
    printf("Philosopher %d picked up right chopstick\n", id);

    // Eating
    printf("Philosopher %d is eating\n", id);
    sleep(2);

    // Put down chopsticks
    pthread_mutex_unlock(&chopstick[id]);
    pthread_mutex_unlock(&chopstick[(id + 1) % N]);
    printf("Philosopher %d finished eating and released chopsticks\n", id);

    return NULL;
}

int main()
{
    pthread_t ph[N];
    int id[N];

    // Initialize mutexes
    for (int i = 0; i < N; i++)
        pthread_mutex_init(&chopstick[i], NULL);

    // Create philosophers
    for (int i = 0; i < N; i++) {
        id[i] = i;
        pthread_create(&ph[i], NULL, philosopher, &id[i]);
    }

    // Wait for philosophers
    for (int i = 0; i < N; i++)
        pthread_join(ph[i], NULL);

    // Destroy mutexes
    for (int i = 0; i < N; i++)
        pthread_mutex_destroy(&chopstick[i]);

    return 0;
}

