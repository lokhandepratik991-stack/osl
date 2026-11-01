# Operating Systems Laboratory (OS Lab) - Pure Codes & Copy-Paste Website

An ultra-fast, streamlined developer website for instant 1-click copying of all Operating System Lab codes. Focuses **exclusively on clean source codes** without any terminal output clutter.

---

## 🚀 How to Open the Website

1. Go to your folder: `c:\Users\prati\OneDrive\Desktop\osl`
2. Double-click **`open_website.bat`** or double-click **`index.html`**.
3. It will open in your default browser.
4. **100% Offline Compatible**: Works directly without internet or any server.

---

## 💻 Features

- **⚡ 1-Click Code Copy**: Copies raw, clean executable code directly to your clipboard without line numbers.
- **🚫 Zero Output Clutter**: Pure source code only—no terminal outputs, no distracting screenshots.
- **🛠️ 1-Click GCC Command**: Copies the exact compilation and execution command (e.g. `gcc filename.c -o out && ./out` or with `-pthread`).
- **🔍 Instant Live Search**: Search by code name, algorithm (`Banker`, `SCAN`, `C-LOOK`, `FIFO`, `Pipes`, `fork`, `Philosopher`), keyword, or code snippet (<kbd>Ctrl + K</kbd> or <kbd>/</kbd>).
- **🏷️ Category Filtering**: Filter by *Deadlock*, *Disk Scheduling*, *IPC*, *Process Control*, *Thread Synchronization*, or *Shell Scripting*.
- **📥 Download All as ZIP**: Click "Download All" to bundle all source code files, `README.md`, and `compile_all.sh`.
- **📄 Multi-file Tabs**: Easily switch between `client.c` and `server.c` for IPC (FIFO).
- **🌓 Dark / Light Theme**: Developer dark mode by default with glassmorphism, with an instant toggle for light mode.
- **📖 Linux Commands Cheatsheet**: Quick modal covering essential Linux commands (`gcc`, `ps`, `kill`, `mkfifo`, etc.).

---

## 📂 Included Experiments

| # | Experiment Name | Language | Source File(s) | Compilation Command |
|---|-----------------|----------|----------------|---------------------|
| **01** | Deadlock Avoidance (Banker's Algorithm) | C | `01_bankers_algorithm.c` | `gcc 01_bankers_algorithm.c -o bankers && ./bankers` |
| **02** | Disk Scheduling (C-LOOK) | C | `02_clook_disk_scheduling.c` | `gcc 02_clook_disk_scheduling.c -o clook && ./clook` |
| **03** | Disk Scheduling (SCAN / Elevator) | C | `03_scan_disk_scheduling.c` | `gcc 03_scan_disk_scheduling.c -o scan && ./scan` |
| **04** | Disk Scheduling (SSTF - Shortest Seek Time First) | C | `04_sstf_disk_scheduling.c` | `gcc 04_sstf_disk_scheduling.c -o sstf && ./sstf` |
| **05** | Interprocess Communication (FIFO / Named Pipes) | C | `05_fifo_client.c`, `05_fifo_server.c` | `gcc 05_fifo_client.c -o client`<br>`gcc 05_fifo_server.c -o server` |
| **06** | Interprocess Communication (Unnamed Pipes) | C | `06_pipes_ipc.c` | `gcc 06_pipes_ipc.c -o pipe && ./pipe` |
| **07** | Process Control (1) - `fork()` & Arithmetic | C | `07_fork_arithmetic.c` | `gcc 07_fork_arithmetic.c -o fork1 && ./fork1` |
| **08** | Process Control (2) - `fork()` & Sorting | C | `08_fork_sorting.c` | `gcc 08_fork_sorting.c -o fork2 && ./fork2` |
| **09** | Shell Scripting (Address Book Management System) | Bash | `09_addressbook.sh` | `chmod +x 09_addressbook.sh && ./09_addressbook.sh` |
| **10** | Thread Synchronization & Deadlock (Dining Philosophers) | C (pthreads) | `10_dining_philosophers.c` | `gcc 10_dining_philosophers.c -pthread -o philosopher && ./philosopher` |
| **11** | Thread Synchronization (Producer-Consumer with Semaphores) | C (pthreads/sem) | `11_producer_consumer.c` | `gcc 11_producer_consumer.c -pthread -o pc && ./pc` |
