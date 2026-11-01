// Process Control System Calls (1) - fork(), arithmetic operations
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t pid;
    int a, b, c;

    printf("Enter Two Number : \n");
    scanf("%d%d", &a, &b);

    pid = fork();

    if (pid == 0) {
        printf("Hi from Child Process.\n");
        c = a + b;
        printf("Child Perform Addition : %d\n", c);
    } else {
        printf("Hi from Parent Process.\n");
        c = a - b;
        printf("Parent Perform Subtraction : %d\n", c);
    }

    return 0;
}

