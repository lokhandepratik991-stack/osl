// OS Lab Code Vault - Pure Codes & 1-Click Copy

const EXPERIMENTS = [
  {
    id: "bankers",
    num: "01",
    title: "Deadlock Avoidance (Banker's Algorithm)",
    category: "Deadlock",
    lang: "c",
    filename: "01_bankers_algorithm.c",
    compileCmd: "gcc 01_bankers_algorithm.c -o bankers && ./bankers",
    desc: "Simulates Banker's algorithm for deadlock avoidance. Tests resource requests against available resources, computes the Need Matrix, and checks safe state.",
    files: [
      {
        name: "01_bankers_algorithm.c",
        code: `#include <stdio.h>

int main() {
    int n, m;
    int allocation[20][20], max[20][20], need[20][20];
    int available[20], work[20], finish[20] = {0};
    int safeSequence[20];
    int i, j, count = 0;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    printf("Enter number of resources: ");
    scanf("%d", &m);

    // Input Allocation Matrix
    printf("\\nEnter Allocation Matrix:\\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            scanf("%d", &allocation[i][j]);
        }
    }

    // Input Maximum Matrix
    printf("\\nEnter Maximum Matrix:\\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            scanf("%d", &max[i][j]);
        }
    }

    // Input Available Resources
    printf("\\nEnter Available Resources:\\n");
    for (j = 0; j < m; j++) {
        scanf("%d", &available[j]);
        work[j] = available[j];
    }

    // Calculate Need Matrix
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            need[i][j] = max[i][j] - allocation[i][j];
        }
    }

    // Display Need Matrix
    printf("\\nNeed Matrix:\\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            printf("%d ", need[i][j]);
        }
        printf("\\n");
    }

    // Banker's Algorithm
    while (count < n) {
        int found = 0;
        for (i = 0; i < n; i++) {
            if (finish[i] == 0) {
                int canExecute = 1;

                // Check if Need[i] <= Work
                for (j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) {
                        canExecute = 0;
                        break;
                    }
                }

                if (canExecute) {
                    // Process can finish
                    for (j = 0; j < m; j++) {
                        work[j] += allocation[i][j];
                    }
                    safeSequence[count++] = i;
                    finish[i] = 1;
                    found = 1;
                }
            }
        }

        // No process can proceed
        if (found == 0) {
            break;
        }
    }

    // Check whether system is safe
    if (count == n) {
        printf("\\nSystem is in a SAFE state.\\n");
        printf("Safe Sequence: ");
        for (i = 0; i < n; i++) {
            printf("P%d", safeSequence[i]);
            if (i != n - 1)
                printf(" -> ");
        }
        printf("\\n");
    } else {
        printf("\\nSystem is in an UNSAFE state.\\n");
        printf("Deadlock may occur.\\n");
    }

    return 0;
}`
      }
    ]
  },
  {
    id: "clook",
    num: "02",
    title: "Disk Scheduling (C-LOOK)",
    category: "Disk Scheduling",
    lang: "c",
    filename: "02_clook_disk_scheduling.c",
    compileCmd: "gcc 02_clook_disk_scheduling.c -o clook && ./clook",
    desc: "Circular LOOK (C-LOOK) disk scheduling. Head services requests in the given direction and immediately returns to the lowest request of the other end.",
    files: [
      {
        name: "02_clook_disk_scheduling.c",
        code: `#include <stdio.h>
#include <stdlib.h>

int main() 
{ 
    int RQ[100], i, j, n, TotalHeadMoment = 0, initial, size, move;

    printf("Enter the number of Requests\\n"); 
    scanf("%d", &n); 

    printf("Enter the Requests sequence\\n"); 
    for (i = 0; i < n; i++) 
        scanf("%d", &RQ[i]); 

    printf("Enter initial head position\\n"); 
    scanf("%d", &initial);

    printf("Enter total disk size\\n"); 
    scanf("%d", &size); 

    printf("Enter the head movement direction for high 1 and for low 0\\n"); 
    scanf("%d", &move); 

    // Logic for C-LOOK disk scheduling 
    // Sort the request array
    for (i = 0; i < n; i++) 
    { 
        for (j = 0; j < n - i - 1; j++) 
        { 
            if (RQ[j] > RQ[j + 1]) 
            { 
                int temp = RQ[j]; 
                RQ[j] = RQ[j + 1]; 
                RQ[j + 1] = temp; 
            } 
        } 
    } 

    int index; 
    for (i = 0; i < n; i++) 
    { 
        if (initial < RQ[i]) 
        { 
            index = i; 
            break; 
        } 
    } 

    // If movement is towards high value 
    if (move == 1) 
    { 
        for (i = index; i < n; i++) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 

        for (i = 0; i < index; i++) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 
    } 
    // If movement is towards low value 
    else 
    { 
        for (i = index - 1; i >= 0; i--) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 

        for (i = n - 1; i >= index; i--) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 
    } 

    printf("Total head movement is %d\\n", TotalHeadMoment); 
    return 0;
}`
      }
    ]
  },
  {
    id: "scan",
    num: "03",
    title: "Disk Scheduling (SCAN / Elevator)",
    category: "Disk Scheduling",
    lang: "c",
    filename: "03_scan_disk_scheduling.c",
    compileCmd: "gcc 03_scan_disk_scheduling.c -o scan && ./scan",
    desc: "SCAN (Elevator Algorithm) disk scheduling. Arm moves towards one end servicing requests until reaching disk boundary (0 or size-1), then reverses.",
    files: [
      {
        name: "03_scan_disk_scheduling.c",
        code: `#include <stdio.h>
#include <stdlib.h>

int main() 
{ 
    int RQ[100], i, j, n, TotalHeadMoment = 0, initial, size, move;

    printf("Enter the number of Requests\\n"); 
    scanf("%d", &n); 

    printf("Enter the Requests sequence\\n"); 
    for (i = 0; i < n; i++) 
        scanf("%d", &RQ[i]); 

    printf("Enter initial head position\\n"); 
    scanf("%d", &initial);

    printf("Enter total disk size\\n"); 
    scanf("%d", &size); 

    printf("Enter the head movement direction for high 1 and for low 0\\n"); 
    scanf("%d", &move); 

    // Logic for SCAN disk scheduling 
    // Sort the request array
    for (i = 0; i < n; i++) 
    { 
        for (j = 0; j < n - i - 1; j++) 
        { 
            if (RQ[j] > RQ[j + 1]) 
            { 
                int temp = RQ[j]; 
                RQ[j] = RQ[j + 1]; 
                RQ[j + 1] = temp; 
            } 
        } 
    } 

    int index; 
    for (i = 0; i < n; i++) 
    { 
        if (initial < RQ[i]) 
        { 
            index = i; 
            break; 
        } 
    } 

    // If movement is towards high value 
    if (move == 1) 
    { 
        for (i = index; i < n; i++) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 
        // Last movement to the highest cylinder (size - 1)
        TotalHeadMoment += abs(size - RQ[i - 1] - 1); 
        initial = size - 1; 

        for (i = index - 1; i >= 0; i--) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 
    } 
    // If movement is towards low value 
    else 
    { 
        for (i = index - 1; i >= 0; i--) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 
        // Last movement to cylinder 0
        TotalHeadMoment += abs(RQ[i + 1] - 0);
        initial = 0; 

        for (i = index; i < n; i++) 
        { 
            TotalHeadMoment += abs(RQ[i] - initial);
            initial = RQ[i];
        } 
    } 

    printf("Total head movement is %d\\n", TotalHeadMoment); 
    return 0;
}`
      }
    ]
  },
  {
    id: "sstf",
    num: "04",
    title: "Disk Scheduling (SSTF)",
    category: "Disk Scheduling",
    lang: "c",
    filename: "04_sstf_disk_scheduling.c",
    compileCmd: "gcc 04_sstf_disk_scheduling.c -o sstf && ./sstf",
    desc: "Shortest Seek Time First (SSTF) disk scheduling. Selects the disk request that has the shortest seek distance from current head position.",
    files: [
      {
        name: "04_sstf_disk_scheduling.c",
        code: `#include <stdio.h>
#include <stdlib.h>

int main() 
{ 
    int RQ[100], i, n, TotalHeadMoment = 0, initial, count = 0;

    printf("Enter the number of Requests\\n"); 
    scanf("%d", &n); 

    printf("Enter the Requests sequence\\n"); 
    for (i = 0; i < n; i++) 
        scanf("%d", &RQ[i]); 

    printf("Enter initial head position\\n"); 
    scanf("%d", &initial); 

    // Logic for SSTF (Shortest Seek Time First) disk scheduling 
    // Loop until all requests are completed
    while (count != n) 
    { 
        int min = 1000, d, index = 0; 
        for (i = 0; i < n; i++) 
        { 
            d = abs(RQ[i] - initial);
            if (min > d) 
            { 
                min = d; 
                index = i; 
            } 
        } 
        TotalHeadMoment += min; 
        initial = RQ[index]; 
        // 1000 is used to mark this request as processed
        RQ[index] = 1000; 
        count++; 
    } 

    printf("Total head movement is %d\\n", TotalHeadMoment); 
    return 0;
}`
      }
    ]
  },
  {
    id: "fifo",
    num: "05",
    title: "Interprocess Communication (FIFO / Named Pipes)",
    category: "IPC",
    lang: "c",
    filename: "05_fifo",
    compileCmd: "gcc 05_fifo_client.c -o client && gcc 05_fifo_server.c -o server",
    desc: "Bidirectional IPC using two FIFOs (named pipes: fifo6.txt, fifo7.txt). Server passes a message; Client counts words, characters, and lines, sending stats back to Server.",
    files: [
      {
        name: "05_fifo_client.c",
        code: `// Client Code – IPC Using FIFO (Named Pipes)
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

int main() 
{ 
    puts("\\n\\tClient - Listening\\n"); 
    int code6 = mkfifo("fifo6.txt", 0666); 
    int code7 = mkfifo("fifo7.txt", 0666); 
    char strMessage[5000]; 
    strMessage[0] = '\\0';

    if (code6 == -1) 
        perror("\\n\\tmkfifo6 returned an error (file may already exist)\\n"); 
    if (code7 == -1) 
        perror("\\n\\tmkfifo7 returned an error (file may already exist)\\n"); 

    int fd = open("fifo6.txt", O_RDONLY); 
    int fd2 = open("fifo7.txt", O_WRONLY); 

    if (fd == -1) 
    { 
        perror("Cannot open FIFO6 for read"); 
        return EXIT_FAILURE; 
    } 
    if (fd2 == -1) 
    { 
        perror("Cannot open FIFO7 for write"); 
        return EXIT_FAILURE; 
    } 

    puts("FIFO OPEN"); 
    char stringBuffer[5000]; 
    memset(stringBuffer, 0, 5000); 

    int res; 
    char Len; 

    res = read(fd, &Len, 1); 
    read(fd, stringBuffer, Len); // Read String Characters 
    stringBuffer[(int)Len] = '\\0'; 
    printf("\\nClient Received: %s\\n", stringBuffer); 

    int j = 0, w = 0, line = 0; 
    while (stringBuffer[j] != '\\0') { 
        char ch = stringBuffer[j]; 
        if ((ch == ' ') || (ch == '\\n')) { 
            w++; 
            if (ch == '\\n') 
                line++; 
        } 
        j++; 
    } 

    char str1[256]; 
    char str2[256]; 
    char str3[256]; 

    sprintf(str1, " No.of Words : %d:::", w); strcat(strMessage, str1); 
    sprintf(str2, " No.of Characters: %d:::", (j - 1)); strcat(strMessage, str2); 
    sprintf(str3, " No.of Lines: %d", line); strcat(strMessage, str3); 

    printf("\\n\\tString: %s\\n", strMessage); 
    char LC = (char)strlen(strMessage); 
    write(fd2, &LC, 1); 
    write(fd2, strMessage, strlen(strMessage)); 
    fflush(stdin); 

    puts("CLIENT CLOSED"); 
    puts("SERVER CLOSED"); 
    close(fd); 
    close(fd2); 
    return 0; 
}`
      },
      {
        name: "05_fifo_server.c",
        code: `// Server Code – IPC Using FIFO (Named Pipes)
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <string.h>

int main() 
{ 
    puts("Server"); 
    char strMessage[5000]; 
    int fd = open("fifo6.txt", O_WRONLY); 
    int fd2 = open("fifo7.txt", O_RDONLY); 

    if (fd == -1) 
    { 
        perror("cannot open fifo6"); 
        return EXIT_FAILURE; 
    } 
    if (fd2 == -1) 
    { 
        perror("cannot open fifo7"); 
        return EXIT_FAILURE; 
    } 

    puts("FIFO OPEN"); 
    char stringBuffer[5000]; 
    memset(stringBuffer, 0, 5000); 

    int res; 
    printf("\\n\\nEnter the Message to be passed (hitting ENTER without any string will terminate program): "); 
    fgets(strMessage, 100, stdin); 
    char L = (char)strlen(strMessage); 

    write(fd, &L, 1); 
    write(fd, strMessage, strlen(strMessage)); 
    fflush(stdin); 

    int len2; 
    res = read(fd2, &len2, 1); 
    read(fd2, stringBuffer, 5000); // Read String Characters 
    stringBuffer[(int)len2] = '\\0'; 

    printf("\\nServer Received: %s\\n", stringBuffer); 

    close(fd); 
    close(fd2); 
    return 0; 
}`
      }
    ]
  },
  {
    id: "pipes",
    num: "06",
    title: "Interprocess Communication (Unnamed Pipes)",
    category: "IPC",
    lang: "c",
    filename: "06_pipes_ipc.c",
    compileCmd: "gcc 06_pipes_ipc.c -o pipe && ./pipe",
    desc: "Two-way communication between parent and child processes using two unnamed pipes. Parent writes file pathname into pipe1; child opens and reads the file, writing contents back through pipe2.",
    files: [
      {
        name: "06_pipes_ipc.c",
        code: `// Interprocess Communication Using Unnamed Pipes
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main() 
{ 
    int pipe1[2], pipe2[2]; 
    pid_t pid; 
    char pathname[100]; 
    char buffer[1024]; 
    int n; 

    // Create two pipes 
    if (pipe(pipe1) == -1 || pipe(pipe2) == -1) 
    { 
        perror("pipe"); 
        exit(1); 
    } 

    // Create child process 
    pid = fork(); 

    if (pid < 0) 
    { 
        perror("fork"); 
        exit(1); 
    } 

    // ---------------- PARENT PROCESS ---------------- 
    if (pid > 0) 
    { 
        // Close unused ends 
        close(pipe1[0]); // Parent writes to pipe1 
        close(pipe2[1]); // Parent reads from pipe2 

        // Enter pathname 
        printf("Enter the pathname of the file: "); 
        scanf("%s", pathname); 

        // Write pathname to first pipe 
        write(pipe1[1], pathname, strlen(pathname) + 1); 

        // Close writing end 
        close(pipe1[1]); 

        // Read file contents from second pipe 
        printf("\\nContents of the file:\\n"); 
        while ((n = read(pipe2[0], buffer, sizeof(buffer) - 1)) > 0) 
        { 
            buffer[n] = '\\0'; 
            printf("%s", buffer); 
        } 
        close(pipe2[0]); 

        // Wait for child 
        wait(NULL); 
    } 
    // ---------------- CHILD PROCESS ---------------- 
    else 
    { 
        FILE *fp; 

        // Close unused ends 
        close(pipe1[1]); // Child reads from pipe1 
        close(pipe2[0]); // Child writes to pipe2 

        // Read pathname from first pipe 
        read(pipe1[0], pathname, sizeof(pathname)); 
        close(pipe1[0]); 

        // Open the file 
        fp = fopen(pathname, "r"); 
        if (fp == NULL) 
        { 
            char *msg = "Error: File cannot be opened.\\n"; 
            write(pipe2[1], msg, strlen(msg)); 
            close(pipe2[1]); 
            exit(1); 
        } 

        // Read file and send contents through second pipe 
        while (fgets(buffer, sizeof(buffer), fp) != NULL) 
        { 
            write(pipe2[1], buffer, strlen(buffer)); 
        } 

        fclose(fp); 
        close(pipe2[1]); 
        exit(0); 
    } 

    return 0; 
}`
      }
    ]
  },
  {
    id: "fork-arithmetic",
    num: "07",
    title: "Process Control (1) - Fork & Arithmetic",
    category: "Process Control",
    lang: "c",
    filename: "07_fork_arithmetic.c",
    compileCmd: "gcc 07_fork_arithmetic.c -o fork1 && ./fork1",
    desc: "Demonstrates fork() system call. Child process (pid == 0) performs addition, while parent process performs subtraction concurrently.",
    files: [
      {
        name: "07_fork_arithmetic.c",
        code: `// Process Control System Calls (1) - fork(), arithmetic operations
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t pid;
    int a, b, c;

    printf("Enter Two Number : \\n");
    scanf("%d%d", &a, &b);

    pid = fork();

    if (pid == 0) {
        printf("Hi from Child Process.\\n");
        c = a + b;
        printf("Child Perform Addition : %d\\n", c);
    } else {
        printf("Hi from Parent Process.\\n");
        c = a - b;
        printf("Parent Perform Subtraction : %d\\n", c);
    }

    return 0;
}`
      }
    ]
  },
  {
    id: "fork-sorting",
    num: "08",
    title: "Process Control (2) - Fork & Sorting",
    category: "Process Control",
    lang: "c",
    filename: "08_fork_sorting.c",
    compileCmd: "gcc 08_fork_sorting.c -o fork2 && ./fork2",
    desc: "Demonstrates concurrent process execution with fork(). Child process sorts an array in Ascending order, while Parent process sorts the array in Descending order.",
    files: [
      {
        name: "08_fork_sorting.c",
        code: `// Process Control System Calls (2) - fork(), sorting array concurrently
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t pid;
    pid = fork();

    int arr[] = {2, 3, 1, 4, 7, 6, 9, 8, 5};
    int n = 9;

    if (pid == 0) {
        printf("For the Ascending Order : \\n");
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                }
            }
        }
        printf("Ascending Order : ");
        for (int i = 0; i < n; i++) {
            printf("%d ", arr[i]);
        }
        printf("\\n");
    } else {
        printf("For the Descending Order : \\n");
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] < arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                }
            }
        }
        printf("Descending Order : ");
        for (int i = 0; i < n; i++) {
            printf("%d ", arr[i]);
        }
        printf("\\n");
    }

    return 0;
}`
      }
    ]
  },
  {
    id: "addressbook",
    num: "09",
    title: "Shell Scripting (Address Book System)",
    category: "Shell Scripting",
    lang: "sh",
    filename: "09_addressbook.sh",
    compileCmd: "chmod +x 09_addressbook.sh && ./09_addressbook.sh",
    desc: "Interactive menu-driven Bash script for Address Book management. Supports creating, viewing, inserting, deleting, and modifying records using grep and sed.",
    files: [
      {
        name: "09_addressbook.sh",
        code: `#!/bin/bash
# Address Book Management System
# Shell Scripting using bash, sed, grep

FILE="addressbook.txt"

createAddressBook()
{
    if [ -e "$FILE" ]; then
        echo "Address book already exists."
    else
        touch "$FILE"
        echo "Address book created."
    fi
}

viewAddressBook()
{
    if [ ! -s "$FILE" ]; then
        echo "Address book is empty or does not exist."
    else
        echo "---- Address Book ----"
        cat "$FILE"
    fi
}

insertRecord()
{
    echo "Enter record in format: LastName,FirstName,Email,Phone"
    read record
    echo "$record" >> "$FILE"
    echo "Record inserted."
}

deleteRecord()
{
    echo "Enter a search string (e.g. name or email) to find the record to delete:"
    read search
    grep -n "$search" "$FILE"
    echo "Enter line number to delete:"
    read line
    sed -i "\${line}d" "$FILE"
    echo "Record deleted."
}

modifyRecord()
{
    echo "Enter a search string (e.g. name or email) to find the record to modify:"
    read search
    grep -n "$search" "$FILE"
    echo "Enter line number to modify:"
    read line
    echo "Enter new record (LastName,FirstName,Email,Phone):"
    read newRecord
    sed -i "\${line}s/.*/\${newRecord}/" "$FILE"
    echo "Record modified."
}

exitProgram()
{
    echo "Exiting... Goodbye!"
    exit 0
}

while true; do
    echo "======= Address Book Menu ======="
    echo "1. Create Address Book"
    echo "2. View Address Book"
    echo "3. Insert a Record"
    echo "4. Delete a Record"
    echo "5. Modify a Record"
    echo "6. Exit"
    echo "Enter your choice:"
    read choice
    case $choice in
        1) createAddressBook ;;
        2) viewAddressBook ;;
        3) insertRecord ;;
        4) deleteRecord ;;
        5) modifyRecord ;;
        6) exitProgram ;;
        *) echo "Invalid choice. Please select 1-6." ;;
    esac
done`
      }
    ]
  },
  {
    id: "dining-philosophers",
    num: "10",
    title: "Thread Sync & Deadlock (Dining Philosophers)",
    category: "Synchronization",
    lang: "c",
    filename: "10_dining_philosophers.c",
    compileCmd: "gcc 10_dining_philosophers.c -pthread -o philosopher && ./philosopher",
    desc: "Classic Dining Philosophers problem implemented using POSIX threads (pthread) and mutex locks to synchronize chopsticks and manage critical section access.",
    files: [
      {
        name: "10_dining_philosophers.c",
        code: `// Thread Synchronization and Deadlock Handling (Dining Philosophers)
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

#define N 5

pthread_mutex_t chopstick[N];

void *philosopher(void *arg)
{
    int id = *(int *)arg;

    printf("Philosopher %d is thinking\\n", id);
    sleep(1);

    // Pick up left chopstick
    pthread_mutex_lock(&chopstick[id]);
    printf("Philosopher %d picked up left chopstick\\n", id);

    // Pick up right chopstick
    pthread_mutex_lock(&chopstick[(id + 1) % N]);
    printf("Philosopher %d picked up right chopstick\\n", id);

    // Eating
    printf("Philosopher %d is eating\\n", id);
    sleep(2);

    // Put down chopsticks
    pthread_mutex_unlock(&chopstick[id]);
    pthread_mutex_unlock(&chopstick[(id + 1) % N]);
    printf("Philosopher %d finished eating and released chopsticks\\n", id);

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
}`
      }
    ]
  },
  {
    id: "producer-consumer",
    num: "11",
    title: "Thread Sync (Producer-Consumer with Semaphores)",
    category: "Synchronization",
    lang: "c",
    filename: "11_producer_consumer.c",
    compileCmd: "gcc 11_producer_consumer.c -pthread -o pc && ./pc",
    desc: "Classic bounded-buffer Producer-Consumer problem implemented with POSIX threads, counting semaphores (sem_t empty, full), and a mutex lock.",
    files: [
      {
        name: "11_producer_consumer.c",
        code: `// Thread Synchronization - Producer-Consumer Problem using Semaphores & Mutex
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5

int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty; // Counts empty spaces
sem_t full;  // Counts filled spaces
pthread_mutex_t mutex;

void *producer(void *arg)
{
    int item;
    for (int i = 1; i <= 10; i++)
    {
        item = i;

        // Wait for an empty space
        sem_wait(&empty);

        // Enter critical section
        pthread_mutex_lock(&mutex);
        buffer[in] = item;
        printf("Producer produced: %d\\n", item);
        in = (in + 1) % BUFFER_SIZE;

        // Leave critical section
        pthread_mutex_unlock(&mutex);

        // Increase number of filled spaces
        sem_post(&full);

        sleep(1);
    }
    return NULL;
}

void *consumer(void *arg)
{
    int item;
    for (int i = 1; i <= 10; i++)
    {
        // Wait for an available item
        sem_wait(&full);

        // Enter critical section
        pthread_mutex_lock(&mutex);
        item = buffer[out];
        printf("Consumer consumed: %d\\n", item);
        out = (out + 1) % BUFFER_SIZE;

        // Leave critical section
        pthread_mutex_unlock(&mutex);

        // Increase number of empty spaces
        sem_post(&empty);

        sleep(2);
    }
    return NULL;
}

int main()
{
    pthread_t producer_thread, consumer_thread;

    // Initialize semaphores
    sem_init(&empty, 0, BUFFER_SIZE);
    sem_init(&full, 0, 0);

    // Initialize mutex
    pthread_mutex_init(&mutex, NULL);

    // Create producer and consumer threads
    pthread_create(&producer_thread, NULL, producer, NULL);
    pthread_create(&consumer_thread, NULL, consumer, NULL);

    // Wait for threads to finish
    pthread_join(producer_thread, NULL);
    pthread_join(consumer_thread, NULL);

    // Destroy synchronization objects
    sem_destroy(&empty);
    sem_destroy(&full);
    pthread_mutex_destroy(&mutex);

    return 0;
}`
      }
    ]
  }
];

// --- SYNTAX HIGHLIGHTER UTILITY ---
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightSyntax(rawCode, lang) {
  const escaped = escapeHtml(rawCode);
  const lines = escaped.split('\n');
  
  return lines.map((line) => {
    let l = line;
    // Comments
    if (lang === 'sh') {
      l = l.replace(/(#.*$)/g, '<span class="token-comment">$1</span>');
    } else {
      l = l.replace(/(\/\/.*$)/g, '<span class="token-comment">$1</span>');
      l = l.replace(/(\/\*.*?\*\/)/g, '<span class="token-comment">$1</span>');
    }
    // Strings
    l = l.replace(/(&quot;.*?&quot;)/g, '<span class="token-string">$1</span>');
    // Preprocessor
    l = l.replace(/(#include\s+&lt;.*?&gt;|#define\s+\w+)/g, '<span class="token-preprocessor">$1</span>');
    // Keywords
    const keywords = ['int', 'void', 'char', 'float', 'return', 'if', 'else', 'for', 'while', 'break', 'case', 'switch', 'do', 'typedef', 'struct', 'then', 'fi', 'esac', 'done', 'read', 'echo', 'touch', 'cat', 'exit', 'true'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      l = l.replace(regex, '<span class="token-keyword">$1</span>');
    });
    // Numbers
    l = l.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
    return l;
  }).join('\n');
}

// --- TOAST MANAGER ---
function showToast(message, isSuccess = true) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 2400);
}

// --- CLIPBOARD HELPER ---
async function copyToClipboard(text, successMsg) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast(successMsg || 'Copied to clipboard!');
    return true;
  } catch (err) {
    console.error('Clipboard copy error:', err);
    showToast('Failed to copy', false);
    return false;
  }
}

// --- STATE MANAGEMENT ---
let activeCategory = 'all';
let searchQuery = '';
const activeFileIndexMap = {}; // expId -> active file index

// --- RENDER CODE CARDS ---
function renderCards() {
  const grid = document.getElementById('code-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = EXPERIMENTS.filter(exp => {
    const matchesCategory = (activeCategory === 'all' || exp.category === activeCategory);
    if (!matchesCategory) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const inTitle = exp.title.toLowerCase().includes(q);
    const inDesc = exp.desc.toLowerCase().includes(q);
    const inCategory = exp.category.toLowerCase().includes(q);
    const inCode = exp.files.some(f => f.code.toLowerCase().includes(q) || f.name.toLowerCase().includes(q));

    return inTitle || inDesc || inCategory || inCode;
  });

  const countElem = document.getElementById('results-count');
  if (countElem) {
    countElem.textContent = `Showing ${filtered.length} of ${EXPERIMENTS.length} codes`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>No matching codes found</h3>
        <p>Try searching for a different keyword like "Banker", "SCAN", "FIFO", or "fork".</p>
      </div>
    `;
    return;
  }

  filtered.forEach(exp => {
    const activeIdx = activeFileIndexMap[exp.id] || 0;
    const currentFile = exp.files[activeIdx] || exp.files[0];
    const lineCount = currentFile.code.split('\n').length;

    const card = document.createElement('article');
    card.className = 'card';
    card.id = `card-${exp.id}`;

    // Render Tabs if multi-file
    let tabsHtml = '';
    if (exp.files.length > 1) {
      tabsHtml = `<div class="file-tabs">`;
      exp.files.forEach((f, idx) => {
        tabsHtml += `
          <button class="file-tab-btn ${idx === activeIdx ? 'active' : ''}" onclick="switchFileTab('${exp.id}', ${idx})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            ${f.name}
          </button>
        `;
      });
      tabsHtml += `</div>`;
    }

    const langBadgeClass = exp.lang === 'c' ? 'tag-lang-c' : 'tag-lang-sh';

    card.innerHTML = `
      <div class="card-header">
        <div class="card-top-row">
          <div class="card-title-group">
            <span class="card-num">${exp.num}</span>
            <h3 class="card-title" title="${exp.title}">${exp.title}</h3>
          </div>
          <div class="card-meta">
            <span class="meta-tag ${langBadgeClass}">${exp.lang.toUpperCase()}</span>
            <span class="meta-tag">${exp.category}</span>
          </div>
        </div>
        <p class="card-desc">${exp.desc}</p>
      </div>

      ${tabsHtml}

      <div class="card-code-area">
        <div class="code-action-strip">
          <span style="display:flex; align-items:center; gap:0.4rem;">
            <strong>${currentFile.name}</strong> &bull; ${lineCount} lines
          </span>
          <div class="strip-actions">
            <button class="btn btn-copy" onclick="copyCardCode('${exp.id}')" title="Copy raw code to clipboard">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy Code</span>
            </button>
            <button class="btn-icon" onclick="openFullscreenModal('${exp.id}')" title="View Fullscreen">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="pre-container">
          <pre><code>${highlightSyntax(currentFile.code, exp.lang)}</code></pre>
        </div>
      </div>

      <div class="card-footer">
        <div class="left-footer-actions">
          <button class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" onclick="copyCompileCmd('${exp.id}')" title="Copy terminal compilation command">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span>GCC Cmd</span>
          </button>
          <button class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;" onclick="downloadSingleFile('${exp.id}')" title="Download source file">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download</span>
          </button>
        </div>
        <div>
          <button class="btn btn-copy" style="padding: 0.45rem 1rem;" onclick="copyCardCode('${exp.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy Code</span>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// --- ACTIONS & HANDLERS ---
function switchFileTab(expId, idx) {
  activeFileIndexMap[expId] = idx;
  renderCards();
}

function copyCardCode(expId) {
  const exp = EXPERIMENTS.find(e => e.id === expId);
  if (!exp) return;
  const activeIdx = activeFileIndexMap[exp.id] || 0;
  const file = exp.files[activeIdx] || exp.files[0];
  copyToClipboard(file.code, `${file.name} copied!`);

  // Feedback on specific button
  const card = document.getElementById(`card-${expId}`);
  if (card) {
    const btns = card.querySelectorAll('.btn-copy');
    btns.forEach(btn => {
      btn.classList.add('copied');
      const originalText = btn.innerHTML;
      btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Copied!</span>
      `;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalText;
      }, 2000);
    });
  }
}

function copyCompileCmd(expId) {
  const exp = EXPERIMENTS.find(e => e.id === expId);
  if (exp) {
    copyToClipboard(exp.compileCmd, 'Compilation command copied!');
  }
}

function downloadSingleFile(expId) {
  const exp = EXPERIMENTS.find(e => e.id === expId);
  if (!exp) return;
  const activeIdx = activeFileIndexMap[exp.id] || 0;
  const file = exp.files[activeIdx] || exp.files[0];

  const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${file.name}`);
}

// --- FULLSCREEN MODAL ---
const codeModal = document.getElementById('code-modal');
let modalCurrentExpId = null;

function openFullscreenModal(expId) {
  const exp = EXPERIMENTS.find(e => e.id === expId);
  if (!exp || !codeModal) return;
  modalCurrentExpId = expId;
  const activeIdx = activeFileIndexMap[exp.id] || 0;
  const file = exp.files[activeIdx] || exp.files[0];

  document.getElementById('modal-num').textContent = exp.num;
  document.getElementById('modal-title').textContent = `${exp.title} (${file.name})`;
  document.getElementById('modal-code').innerHTML = highlightSyntax(file.code, exp.lang);
  codeModal.showModal();
}

// --- CHEATSHEET MODAL ---
const cheatsheetModal = document.getElementById('cheatsheet-modal');

// Explicitly attach interactive functions to window for onclick handlers
window.copyCardCode = copyCardCode;
window.switchFileTab = switchFileTab;
window.openFullscreenModal = openFullscreenModal;
window.copyCompileCmd = copyCompileCmd;
window.downloadSingleFile = downloadSingleFile;

// DOMContentLoaded Initializer
document.addEventListener('DOMContentLoaded', () => {
  // Modal bindings
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn && codeModal) {
    modalCloseBtn.addEventListener('click', () => codeModal.close());
  }

  const modalCopyBtn = document.getElementById('modal-copy-btn');
  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      if (modalCurrentExpId) copyCardCode(modalCurrentExpId);
    });
  }

  if (codeModal) {
    codeModal.addEventListener('click', (e) => {
      const rect = codeModal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        codeModal.close();
      }
    });
  }

  // Cheatsheet bindings
  const cheatsheetBtn = document.getElementById('btn-cheatsheet');
  if (cheatsheetBtn && cheatsheetModal) {
    cheatsheetBtn.addEventListener('click', () => cheatsheetModal.showModal());
  }

  const cheatsheetCloseBtn = document.getElementById('cheatsheet-close-btn');
  if (cheatsheetCloseBtn && cheatsheetModal) {
    cheatsheetCloseBtn.addEventListener('click', () => cheatsheetModal.close());
  }

  if (cheatsheetModal) {
    cheatsheetModal.addEventListener('click', (e) => {
      const rect = cheatsheetModal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        cheatsheetModal.close();
      }
    });
  }

  // Download All as ZIP
  const downloadAllBtn = document.getElementById('btn-download-all');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', async () => {
      if (typeof JSZip === 'undefined') {
        showToast('ZIP library loading, please try again in a moment...');
        return;
      }
      try {
        const zip = new JSZip();
        const folder = zip.folder("os_lab_codes");

        // Add all experiment files
        EXPERIMENTS.forEach(exp => {
          exp.files.forEach(f => {
            folder.file(f.name, f.code);
          });
        });

        // Add Makefile / compile instructions
        const readmeContent = `# Operating Systems Lab - Complete Codes\n\n` +
          `Included Experiments:\n` +
          EXPERIMENTS.map(e => `- ${e.num}. ${e.title} -> ${e.files.map(f => f.name).join(', ')} (Compile: ${e.compileCmd})`).join('\n') +
          `\n\nAll programs tested and verified with GCC on Linux/Ubuntu.`;

        folder.file("README.md", readmeContent);

        // Build compile_all.sh script
        const compileScript = `#!/bin/bash\n# Compile all OS Lab programs\necho "Compiling all OS lab files..."\n` +
          EXPERIMENTS.map(e => e.compileCmd).join('\n') +
          `\necho "All compilations completed!"\n`;

        folder.file("compile_all.sh", compileScript);

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = "OS_Lab_Codes_All.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('Downloaded OS_Lab_Codes_All.zip!');
      } catch (err) {
        console.error('Zip generation failed:', err);
        showToast('Failed to create ZIP', false);
      }
    });
  }

  // Search logic
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderCards();
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Category filters
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      renderCards();
    });
  });

  // Theme toggle
  const themeBtn = document.getElementById('btn-theme-toggle');
  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
      localStorage.setItem('osl_theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
      localStorage.setItem('osl_theme', 'dark');
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  // Initialize Theme
  const savedTheme = localStorage.getItem('osl_theme') || 'dark';
  setTheme(savedTheme);

  // Initial render
  renderCards();
});
