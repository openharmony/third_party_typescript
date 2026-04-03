#!/bin/bash
# Copyright (c) 2026 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

# ============================================================================
# Configuration
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
REPORTS_DIR="$ROOT_DIR/tests/test-reports"
TIMESTAMP=$(date +%Y-%m-%dT%H-%M-%S)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ============================================================================
# Global Variables
# ============================================================================

VERBOSE=false
FAIL_FAST=false
SELECTED_SUITES=()

# ============================================================================
# Utility Functions
# ============================================================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_header() {
    echo ""
    echo "================================================================================"
    echo "  $1"
    echo "================================================================================"
    echo ""
}

format_duration() {
    local seconds=$1
    local minutes=$((seconds / 60))
    local hours=$((minutes / 60))

    if [ $hours -gt 0 ]; then
        echo "${hours}h $((minutes % 60))m $((seconds % 60))s"
    elif [ $minutes -gt 0 ]; then
        echo "${minutes}m $((seconds % 60))s"
    else
        echo "${seconds}s"
    fi
}

# ============================================================================
# Test Suite Definitions (Hardcoded for simplicity)
# ============================================================================

# TSC Native Test Suite
run_tsc_native() {
    print_header "Running: TSC Native Test Suite"
    
    cd "$ROOT_DIR"
    local start_time=$(date +%s)
    
    log_info "[1/4] Installing dependencies..."
    npm ci || { log_error "npm ci failed"; return 1; }
    log_success "Dependencies installed"
    
    log_info "[2/4] Building compiler..."
    npm run build || { log_error "Build failed"; return 1; }
    log_success "Build completed"
    
    log_info "[3/4] Creating release..."
    npm run release || { log_error "Release failed"; return 1; }
    log_success "Release created"
    
    log_info "[4/4] Running tests..."
    npm run test || { log_error "Tests failed"; return 1; }
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log_success "TSC Native: PASSED ($(format_duration $duration))"
    return 0
}

# TS Extra Test Suite
run_ts_extra() {
    print_header "Running: TS Extra Test Suite"
    
    cd "$ROOT_DIR/tests/ts_extra_tests"
    local start_time=$(date +%s)
    
    log_info "[1/1] Running TS extra tests..."
    python ./run_ts_case.py test_ts_cases -tsc ../../bin/tsc -v4.9 --disable-list ./test_ts_cases/disablelist_tsc.txt || {
        log_error "TS extra tests failed"
        return 1
    }
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log_success "TS Extra: PASSED ($(format_duration $duration))"
    return 0
}

# ArkTest Suite
run_arkts() {
    print_header "Running: ArkTest Suite"
    
    cd "$ROOT_DIR"
    local start_time=$(date +%s)
    
    log_info "[1/8] Building compiler..."
    npm run build || { log_error "Build failed"; return 1; }
    log_success "Build completed"
    
    log_info "[2/8] Creating release..."
    npm run release || { log_error "Release failed"; return 1; }
    log_success "Release created"
    
    log_info "[3/8] Creating npm pack..."
    npm pack || { log_error "npm pack failed"; return 1; }
    log_success "npm pack completed"
    
    log_info "[4/8] Changing to ArkTest directory..."
    cd tests/arkTSTest
    log_success "Changed to $(pwd)"
    
    log_info "[5/8] Cleaning dependencies..."
    rm -rf node_modules package-lock.json
    log_success "Dependencies cleaned"
    
    log_info "[6/8] Installing dependencies..."
    npm install || { log_error "npm install failed"; return 1; }
    log_success "Dependencies installed"
    
    log_info "[7/8] Running ArkTest v1.0..."
    node run.js -D -v1.0 || { log_error "ArkTest v1.0 failed"; return 1; }
    log_success "ArkTest v1.0 passed"
    
    log_info "[8/8] Running ArkTest v1.1..."
    node run.js -D -v1.1 || { log_error "ArkTest v1.1 failed"; return 1; }
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log_success "ArkTest: PASSED ($(format_duration $duration))"
    return 0
}

# System API Test Suite
run_system_api() {
    print_header "Running: System API Test Suite"
    
    cd "$ROOT_DIR"
    local start_time=$(date +%s)
    
    log_info "[1/2] Installing dependencies..."
    npm ci || { log_error "npm ci failed"; return 1; }
    log_success "Dependencies installed"
    
    log_info "[2/2] Running system API tests..."
    npm run test:system-api || { log_error "System API tests failed"; return 1; }
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log_success "System API: PASSED ($(format_duration $duration))"
    return 0
}

# ============================================================================
# Main Functions
# ============================================================================

show_help() {
    cat << EOF
TypeScript Compiler Auto Test Suite Runner (Shell Version)

Usage:
  $0 [options]

Options:
  --all, -a                Run all test suites
  --suite <name>, -s <name> Run a specific test suite
  --fail-fast, -f          Stop on first failure
  --verbose, -v            Enable verbose output
  --help, -h               Show this help message

Available Test Suites:
  - tsc-native    TypeScript compiler native tests
  - ts-extra      Extended TypeScript tests
  - arkts         ArkTS linter tests (v1.0 + v1.1)
  - system-api    System API tests

Examples:
  ./scripts/auto-test-runner.sh --all
  ./scripts/auto-test-runner.sh --suite tsc-native
  ./scripts/auto-test-runner.sh --suite ts-extra --verbose
  ./scripts/auto-test-runner.sh --all --fail-fast

Requirements:
  - npm
  - node
  - python3 (for ts-extra)

EOF
}

parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --all|-a)
                SELECTED_SUITES=(tsc-native ts-extra arkts system-api)
                shift
                ;;
            --suite|-s)
                if [ -z "$2" ]; then
                    log_error "--suite requires a suite name"
                    exit 1
                fi
                SELECTED_SUITES+=("$2")
                shift 2
                ;;
            --fail-fast|-f)
                FAIL_FAST=true
                shift
                ;;
            --verbose|-v)
                VERBOSE=true
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

check_dependencies() {
    local missing=()
    
    if ! command -v npm &> /dev/null; then
        missing+=("npm")
    fi
    
    if ! command -v node &> /dev/null; then
        missing+=("node")
    fi
    
    if [ ${#missing[@]} -gt 0 ]; then
        log_error "Missing dependencies: ${missing[*]}"
        exit 1
    fi
}

run_suite() {
    local suite_name=$1
    
    case $suite_name in
        tsc-native)
            run_tsc_native
            ;;
        ts-extra)
            run_ts_extra
            ;;
        arkts)
            run_arkts
            ;;
        system-api)
            run_system_api
            ;;
        *)
            log_error "Unknown test suite: $suite_name"
            return 1
            ;;
    esac
}

main() {
    # Check for help flag first
    for arg in "$@"; do
        if [[ "$arg" == "--help" || "$arg" == "-h" ]]; then
            show_help
            exit 0
        fi
    done
    
    print_header "TypeScript Compiler Auto Test Suite Runner (Shell Version)"
    # Check dependencies
    check_dependencies
    
    # Parse arguments
    parse_arguments "$@"
    
    # Check if suites are selected
    if [ ${#SELECTED_SUITES[@]} -eq 0 ]; then
        log_error "No test suites selected. Use --all, --suite, or --suites"
        show_help
        exit 1
    fi
    
    # Print selected suites
    log_info "Test suites to run: ${SELECTED_SUITES[*]}"
    echo ""
    
    # Execute test suites
    local total_start_time=$(date +%s)
    local passed=0
    local failed=0
    local suite_count=${#SELECTED_SUITES[@]}
    local current=0
    local failed_suites=()  # Array to track failed suite names
    
    for suite in "${SELECTED_SUITES[@]}"; do
        current=$((current + 1))
        log_info "[$current/$suite_count] Running: $suite"
        
        if run_suite "$suite"; then
            passed=$((passed + 1))
        else
            failed=$((failed + 1))
            failed_suites+=("$suite")
            if [ "$FAIL_FAST" = true ]; then
                log_error "Stopping due to failure (--fail-fast mode)"
                break
            fi
        fi
    done
    
    local total_end_time=$(date +%s)
    local total_duration=$((total_end_time - total_start_time))
    
    # Print summary
    print_header "Test Suite Execution Summary"
    
    echo "Total:    $suite_count suites"
    echo -e "Passed:   ${GREEN}$passed${NC}"
    echo -e "Failed:   ${RED}$failed${NC}"
    echo "Duration: $(format_duration $total_duration)"
    
    # Print failed suites details if any
    if [ $failed -gt 0 ]; then
        echo ""
        log_error "Failed Test Suites:"
        for failed_suite in "${failed_suites[@]}"; do
            echo -e "  ${RED}✗${NC} $failed_suite"
        done
        echo ""
    fi
    # Exit with appropriate code
    if [ $failed -gt 0 ]; then
        exit 1
    else
        exit 0
    fi

}

# Entry point
main "$@"